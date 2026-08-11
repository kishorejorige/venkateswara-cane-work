import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onNavigateHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onNavigateHome }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isSupabaseConfigured()) {
      setErrorMessage(
        'Supabase is not configured yet. Please add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your .env.local file.'
      );
      return;
    }

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        console.error('Supabase login error:', error);
        setErrorMessage('Invalid email or password. Please try again.');
      } else {
        onLoginSuccess();
      }
    } catch (err: unknown) {
      console.error('Unexpected login error:', err);
      setErrorMessage('Network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1 className="admin-login-brand">Venkateswara Cane Work</h1>
          <h2 className="admin-login-title">Shop Owner Login</h2>
          <p className="admin-login-sub">Sign in to manage your product catalog</p>
        </div>

        {!isSupabaseConfigured() && (
          <div className="admin-alert admin-alert-warning" role="alert">
            <strong>Notice:</strong> Supabase environment variables are missing. Set up <code>.env.local</code> to log in.
          </div>
        )}

        {errorMessage && (
          <div className="admin-alert admin-alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-form-group">
            <label htmlFor="admin-email">Email Address</label>
            <input
              id="admin-email"
              type="email"
              required
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="admin-input"
              autoComplete="username"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="admin-input"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="admin-btn admin-btn-primary admin-btn-block"
          >
            {loading ? 'Signing in...' : 'Log In'}
          </button>
        </form>

        <div className="admin-login-footer">
          <button onClick={onNavigateHome} className="admin-btn-link">
            ← Return to Main Website
          </button>
        </div>
      </div>
    </div>
  );
};

