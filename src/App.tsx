import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';
import { TeamManagement } from './components/TeamManagement';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { Auth } from './components/Auth';
import { useAuth } from './hooks/useAuth';
import { isSupabaseConfigured } from './lib/supabase';

function App() {
  const { user, loading } = useAuth();
  const [configError, setConfigError] = React.useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setConfigError('Supabase configuration is missing. Please check your environment variables.');
    }
  }, []);

  if (configError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-600 mb-4">Configuration Error</h2>
          <p className="text-gray-600">{configError}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {user && <Header />}
        <main className="flex-grow">
          <Routes>
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            {!user ? (
              <Route path="*" element={<Auth />} />
            ) : (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/team" element={<TeamManagement />} />
              </>
            )}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;