import { Route, Switch } from 'wouter';
import { useWebsiteContent } from './hooks/useWebsiteContent';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { About } from './pages/About';

function App() {
  const { content, loading, error } = useWebsiteContent();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-display text-copper mb-4 animate-pulse">
            Loading...
          </div>
          <div className="text-cream-muted font-mono text-sm">
            Forging your experience
          </div>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-display text-copper mb-4">
            Error
          </div>
          <div className="text-cream-muted">
            {error?.message || 'Failed to load website content'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout content={content}>
      <Switch>
        <Route path="/" component={() => <Home content={content} />} />
        <Route path="/work" component={() => <Work content={content} />} />
        <Route path="/about" component={() => <About content={content} />} />
        <Route>
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-display text-copper mb-4">404</div>
              <div className="text-cream-muted mb-8">Page not found</div>
              <a href="/" className="text-copper hover:text-copper-light font-mono text-sm uppercase tracking-wider">
                Return Home
              </a>
            </div>
          </div>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
