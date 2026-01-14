import type { VercelRequest, VercelResponse } from '@vercel/node';

// Notion API configuration
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_TALENT_DATABASE_ID;
const NOTION_VERSION = '2022-06-28';

interface ApplicationData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  city: string;
  availability: string[];
  experienceYears: string;
  previousBrands: string;
  skills: string[];
  certifications: string;
  instagram: string;
  whyJoin: string;
}

// Helper to parse multipart form data
async function parseMultipartFormData(req: VercelRequest): Promise<{ fields: Record<string, string>; files: Record<string, { name: string; data: Buffer; type: string }> }> {
  return new Promise((resolve, reject) => {
    const contentType = req.headers['content-type'] || '';
    const boundary = contentType.split('boundary=')[1];

    if (!boundary) {
      reject(new Error('No boundary found in content-type'));
      return;
    }

    const chunks: Buffer[] = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const parts = buffer.toString('binary').split(`--${boundary}`);

      const fields: Record<string, string> = {};
      const files: Record<string, { name: string; data: Buffer; type: string }> = {};

      for (const part of parts) {
        if (part.includes('Content-Disposition')) {
          const nameMatch = part.match(/name="([^"]+)"/);
          const filenameMatch = part.match(/filename="([^"]+)"/);
          const contentTypeMatch = part.match(/Content-Type: ([^\r\n]+)/);

          if (nameMatch) {
            const name = nameMatch[1];
            // Find the actual content (after double newline)
            const contentStart = part.indexOf('\r\n\r\n');
            if (contentStart !== -1) {
              let content = part.slice(contentStart + 4);
              // Remove trailing boundary markers
              content = content.replace(/\r\n--$/, '').replace(/--\r\n$/, '').replace(/\r\n$/, '');

              if (filenameMatch && contentTypeMatch) {
                // This is a file
                files[name] = {
                  name: filenameMatch[1],
                  data: Buffer.from(content, 'binary'),
                  type: contentTypeMatch[1]
                };
              } else {
                // This is a regular field
                fields[name] = content.trim();
              }
            }
          }
        }
      }

      resolve({ fields, files });
    });
    req.on('error', reject);
  });
}

// Upload file to Notion
async function uploadFileToNotion(file: { name: string; data: Buffer; type: string }): Promise<string | null> {
  if (!NOTION_API_KEY) return null;

  try {
    // Step 1: Create file upload
    const createResponse = await fetch('https://api.notion.com/v1/files', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filename: file.name,
        mime_type: file.type
      })
    });

    if (!createResponse.ok) {
      console.error('Failed to create file upload:', await createResponse.text());
      return null;
    }

    const { file_id, upload_url } = await createResponse.json();

    // Step 2: Upload the file content
    const formData = new FormData();
    formData.append('file', new Blob([file.data], { type: file.type }), file.name);

    const uploadResponse = await fetch(upload_url, {
      method: 'POST',
      body: formData
    });

    if (!uploadResponse.ok) {
      console.error('Failed to upload file:', await uploadResponse.text());
      return null;
    }

    // Step 3: Complete the upload
    const completeResponse = await fetch(`https://api.notion.com/v1/files/${file_id}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': NOTION_VERSION
      }
    });

    if (!completeResponse.ok) {
      console.error('Failed to complete file upload:', await completeResponse.text());
      return null;
    }

    return file_id;
  } catch (error) {
    console.error('Error uploading file to Notion:', error);
    return null;
  }
}

// Create Notion page with application data
async function createNotionPage(data: ApplicationData, headshotFileId: string | null, resumeFileId: string | null): Promise<boolean> {
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    console.error('Missing Notion API key or database ID');
    return false;
  }

  try {
    // Parse arrays from JSON strings
    const availability = typeof data.availability === 'string'
      ? JSON.parse(data.availability)
      : data.availability;
    const skills = typeof data.skills === 'string'
      ? JSON.parse(data.skills)
      : data.skills;

    const properties: Record<string, unknown> = {
      'Full Name': {
        title: [{ text: { content: data.fullName } }]
      },
      'Email': {
        email: data.email
      },
      'Phone': {
        phone_number: data.phone
      },
      'Position': {
        select: { name: data.position }
      },
      'City': {
        rich_text: [{ text: { content: data.city } }]
      },
      'Status': {
        select: { name: 'New Application' }
      },
      'Applied Date': {
        date: { start: new Date().toISOString().split('T')[0] }
      }
    };

    // Add optional fields if provided
    if (availability && availability.length > 0) {
      properties['Availability'] = {
        multi_select: availability.map((item: string) => ({ name: item }))
      };
    }

    if (data.experienceYears) {
      properties['Experience Years'] = {
        number: parseInt(data.experienceYears, 10) || 0
      };
    }

    if (data.previousBrands) {
      properties['Previous Brands'] = {
        rich_text: [{ text: { content: data.previousBrands } }]
      };
    }

    if (skills && skills.length > 0) {
      properties['Skills'] = {
        multi_select: skills.map((item: string) => ({ name: item }))
      };
    }

    if (data.certifications) {
      properties['Certifications'] = {
        rich_text: [{ text: { content: data.certifications } }]
      };
    }

    if (data.instagram) {
      properties['Instagram'] = {
        url: data.instagram.startsWith('http')
          ? data.instagram
          : `https://instagram.com/${data.instagram.replace('@', '')}`
      };
    }

    if (data.whyJoin) {
      properties['Why ImmerseForge'] = {
        rich_text: [{ text: { content: data.whyJoin.slice(0, 2000) } }]
      };
    }

    // Add file attachments if uploaded
    if (headshotFileId) {
      properties['Headshot'] = {
        files: [{
          type: 'file',
          file: { url: headshotFileId }
        }]
      };
    }

    if (resumeFileId) {
      properties['Resume'] = {
        files: [{
          type: 'file',
          file: { url: resumeFileId }
        }]
      };
    }

    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to create Notion page:', errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error creating Notion page:', error);
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse form data
    const { fields, files } = await parseMultipartFormData(req);

    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'position', 'city', 'whyJoin'];
    for (const field of requiredFields) {
      if (!fields[field]) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fields.email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if headshot was provided
    if (!files.headshot) {
      return res.status(400).json({ error: 'Headshot is required' });
    }

    // Upload files to Notion (if API is configured)
    let headshotFileId: string | null = null;
    let resumeFileId: string | null = null;

    if (NOTION_API_KEY) {
      if (files.headshot) {
        headshotFileId = await uploadFileToNotion(files.headshot);
      }
      if (files.resume) {
        resumeFileId = await uploadFileToNotion(files.resume);
      }
    }

    // Create application data object
    const applicationData: ApplicationData = {
      fullName: fields.fullName,
      email: fields.email,
      phone: fields.phone,
      position: fields.position,
      city: fields.city,
      availability: fields.availability ? JSON.parse(fields.availability) : [],
      experienceYears: fields.experienceYears || '',
      previousBrands: fields.previousBrands || '',
      skills: fields.skills ? JSON.parse(fields.skills) : [],
      certifications: fields.certifications || '',
      instagram: fields.instagram || '',
      whyJoin: fields.whyJoin
    };

    // Create Notion page
    if (NOTION_API_KEY && NOTION_DATABASE_ID) {
      const success = await createNotionPage(applicationData, headshotFileId, resumeFileId);
      if (!success) {
        console.error('Failed to create Notion entry, but continuing...');
        // Note: We still return success to user even if Notion fails
        // In production, you might want to handle this differently
      }
    } else {
      console.log('Notion not configured. Application data:', applicationData);
    }

    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully'
    });

  } catch (error) {
    console.error('Error processing application:', error);
    return res.status(500).json({
      error: 'Failed to process application',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
