import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { Shield3D } from '../components/ui/Illustrations3D';

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
      showToast('Welcome back to WeSafe!', 'success');
      navigate('/dashboard');
    } catch (err) {
      showToast('Invalid credentials. Please try again.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoAdmin = () => {
    setEmail('admin@wesafe.org');
    setPassword('Password123!');
  };

  return (
    <div className="min-h-screen bg-linen dark:bg-[#3a1322] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-3 mb-3 group">
          <Shield3D className="w-12 h-12 group-hover:scale-105 transition-transform" />
          <span className="text-2xl font-extrabold text-wine-plum dark:text-bone">
            WeSafe
          </span>
        </Link>
        <h2 className="text-2xl font-black text-wine-plum dark:text-bone tracking-tight">
          Welcome Back
        </h2>
        <p className="text-xs text-dust-grey-dark dark:text-silver mt-1">
          Access your safe circle, safer route intelligence, and Gemini AI protection.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <GlassCard className="p-6 sm:p-8 space-y-6 border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-lg">
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
              <label className="flex items-center gap-2 text-wine-plum/80 dark:text-silver cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-dust-grey text-wine-plum focus:ring-accent" />
                <span>Remember me</span>
              </label>

              <Link to="/forgot-password" className="font-semibold text-accent dark:text-almond-dark hover:underline">
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
              Sign In to WeSafe
            </Button>
          </form>

          {/* Demo Login Shortcuts */}
          <div className="pt-4 border-t border-dust-grey/40 dark:border-smoky-rose/20 text-center space-y-2">
            <p className="text-[11px] font-bold text-dust-grey-dark dark:text-silver uppercase tracking-wider">Demo Quick Access</p>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setEmail('priya@example.com');
                  setPassword('Password123!');
                }}
                className="px-2.5 py-1 rounded-lg bg-powder-petal/80 dark:bg-wine-plum/60 hover:bg-powder-petal text-wine-plum dark:text-bone text-xs font-semibold transition-colors border border-dust-grey/50"
              >
                Commuter (Priya)
              </button>
              <button
                type="button"
                onClick={handleQuickDemoAdmin}
                className="px-2.5 py-1 rounded-lg bg-powder-petal/80 dark:bg-wine-plum/60 hover:bg-powder-petal text-wine-plum dark:text-bone text-xs font-semibold transition-colors border border-dust-grey/50"
              >
                Admin Reviewer
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-dust-grey-dark dark:text-silver">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-wine-plum dark:text-bone hover:underline">
              Create one now
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
};
