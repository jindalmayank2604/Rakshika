import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('priya@example.com');
  const [password, setPassword] = useState('Password123!');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      showToast('Welcome back to Rakshika!', 'success');
      navigate('/dashboard');
    } catch (err) {
      showToast('Invalid credentials. Please try again.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoAdmin = () => {
    setEmail('admin@rakshika.org');
    setPassword('Password123!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/70 via-[#FAF8FF] to-teal-50/50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
          <div className="w-11 h-11 rounded-2xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/25 group-hover:scale-105 transition-transform">
            <Shield className="w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-primary-900 to-indigo-700 bg-clip-text text-transparent">
            Rakshika
          </span>
        </Link>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Welcome Back
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Access your safe circle, community insights, and AI protection.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <GlassCard className="p-6 sm:p-8 space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                <span>Remember me</span>
              </label>

              <Link to="/forgot-password" className="font-semibold text-primary-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center py-3 font-bold"
              loading={loading}
              icon={ArrowRight}
            >
              Sign In to Rakshika
            </Button>
          </form>

          {/* Demo Login Shortcuts */}
          <div className="pt-4 border-t border-slate-100 text-center space-y-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Demo Quick Access</p>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setEmail('priya@example.com');
                  setPassword('Password123!');
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                User (Priya)
              </button>
              <button
                type="button"
                onClick={handleQuickDemoAdmin}
                className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition-colors"
              >
                Admin Reviewer
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-primary-600 hover:underline">
              Create one now
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
};
