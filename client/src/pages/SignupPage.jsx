import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { Shield3D } from '../components/ui/Illustrations3D';

export const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  // Password strength logic
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-dust-grey' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 25, label: 'Weak', color: 'bg-emergency' };
    if (score === 2) return { score: 50, label: 'Fair', color: 'bg-accent' };
    if (score === 3) return { score: 75, label: 'Good', color: 'bg-wine-plum' };
    return { score: 100, label: 'Strong', color: 'bg-emerald-700' };
  };

  const strength = getPasswordStrength(formData.password);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match.', 'danger');
      return;
    }
    if (!termsAccepted) {
      showToast('Please accept the Terms & Privacy terms.', 'danger');
      return;
    }

    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.phone, formData.password);
      showToast('Account created! Welcome to WeSafe.', 'success');
      navigate('/dashboard');
    } catch (err) {
      showToast(err.message || 'Registration error. Please verify your details.', 'danger');
    } finally {
      setLoading(false);
    }
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
          Create Your Safety Circle
        </h2>
        <p className="text-xs text-dust-grey-dark dark:text-silver mt-1">
          Join a community committed to proactive prevention and empowerment.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <GlassCard className="p-6 sm:p-8 space-y-5 border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-lg">
          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Your full name"
              icon={User}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="yourname@example.com"
              icon={Mail}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="+91 98765 43210"
              icon={Phone}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />

            <div className="space-y-1">
              <Input
                label="Password"
                type="password"
                placeholder="Create secure password"
                icon={Lock}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />

              {formData.password && (
                <div className="pt-1.5 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-dust-grey-dark dark:text-silver">Strength:</span>
                    <span className="text-wine-plum dark:text-bone">{strength.label}</span>
                  </div>
                  <div className="w-full bg-dust-grey/40 dark:bg-wine-plum/60 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${strength.color}`}
                      style={{ width: `${strength.score}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Repeat password"
              icon={Lock}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />

            <label className="flex items-start gap-2.5 text-xs text-dust-grey-dark dark:text-silver cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 rounded border-dust-grey text-wine-plum focus:ring-accent"
              />
              <span className="leading-snug">
                I agree to the <Link to="/settings" className="font-semibold text-accent dark:text-almond-dark underline">Terms of Service</Link> and <Link to="/settings" className="font-semibold text-accent dark:text-almond-dark underline">Privacy Policy</Link>.
              </span>
            </label>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center py-3 font-bold"
              loading={loading}
              icon={ArrowRight}
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-xs text-dust-grey-dark dark:text-silver pt-2 border-t border-dust-grey/40 dark:border-smoky-rose/20">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-wine-plum dark:text-bone hover:underline">
              Log in
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
};
