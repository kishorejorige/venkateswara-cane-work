import React, { useEffect, useState, useCallback } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import './Admin.css';

interface AdminAppProps {
  onNavigateHome: () => void;
}

export const AdminApp: React.FC<AdminAppProps> = ({ onNavigateHome }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(() => isSupabaseConfigured());

  const checkAuthorization = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle();

      if (error || !data) {
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
    } catch {
      setIsAuthorized(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      return;
    }

    // Fetch initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        checkAuthorization(session.user.id);
      } else {
        setIsAuthorized(false);
        setLoading(false);
      }
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        setLoading(true);
        checkAuthorization(session.user.id);
      } else {
        setIsAuthorized(false);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [checkAuthorization]);

  const handleLogout = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    setSession(null);
    setIsAuthorized(false);
  };

  if (loading) {
    return (
      <div className="admin-loading-screen">
        <div className="spinner"></div>
        <p>Verifying admin authorization...</p>
      </div>
    );
  }

  // If user is authenticated via auth, but not authorized in admin_users table
  if (session && isAuthorized === false) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <h1 className="admin-login-brand">Venkateswara Cane Work</h1>
            <h2 className="admin-login-title" style={{ color: '#dc2626' }}>Access Denied</h2>
          </div>

          <div className="admin-alert admin-alert-danger" role="alert">
            Your account ({session.user.email}) is authenticated, but you are not registered in the administrator access list (<code>admin_users</code>).
          </div>

          <div className="admin-access-denied-actions">
            <button onClick={handleLogout} className="admin-btn admin-btn-secondary admin-btn-block">
              Sign Out
            </button>
            <button onClick={onNavigateHome} className="admin-btn-link" style={{ marginTop: '1rem' }}>
              ← Return to Main Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (session && isAuthorized) {
    return <AdminDashboard onLogout={handleLogout} onNavigateHome={onNavigateHome} />;
  }

  return <AdminLogin onLoginSuccess={() => setLoading(true)} onNavigateHome={onNavigateHome} />;
};
