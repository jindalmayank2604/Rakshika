import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, UserCheck } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { Shield3D } from '../components/ui/Illustrations3D';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, continueAsGuest } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password.', 'danger');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      showToast('Welcome back to WeSafe!', 'success');
      navigate('/dashboard');
    } catch (err) {
      showToast(err.message || 'Invalid email or password. Please try again.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAccess = () => {
    continueAsGuest();
    showToast('Browsing as Guest. Sign in anytime to submit hazard reports.', 'info');
    navigate('/map');
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

          {/* Guest Browsing Link */}
          <div className="pt-3 border-t border-dust-grey/40 dark:border-smoky-rose/20 text-center">
            <button
              type="button"
              onClick={handleGuestAccess}
              className="w-full py-2 px-3 rounded-xl border border-dust-grey/60 dark:border-smoky-rose/30 hover:bg-powder-petal/50 dark:hover:bg-wine-plum/40 text-wine-plum dark:text-bone text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-accent" />
              <span>Continue as Guest (Explore Map)</span>
            </button>
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

