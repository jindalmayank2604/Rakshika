import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Success3DIllustration } from '../assets/illustrations/3DIllustrations';
import { useNotifications } from '../context/NotificationContext';
import { Shield3D } from '../components/ui/Illustrations3D';

export const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useNotifications();

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      showToast('Verification code sent to your email.', 'info');
    }, 600);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (!code) return;
    setStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!newPassword) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(4);
      showToast('Password reset successfully!', 'success');
    }, 600);
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
          Reset Password
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <GlassCard className="p-6 sm:p-8 space-y-6 border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-lg">
          {step === 1 && (
            <form onSubmit={handleSendCode} className="space-y-4">
              <p className="text-xs text-dust-grey-dark dark:text-silver">
                Enter your registered email address to receive a secure password recovery code.
              </p>
              <Input
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" variant="primary" className="w-full justify-center" loading={loading} icon={ArrowRight}>
                Send Reset Code
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <p className="text-xs text-dust-grey-dark dark:text-silver">
                We sent a 6-digit verification code to <strong className="text-wine-plum dark:text-bone">{email}</strong>.
              </p>
              <Input
                label="6-Digit Verification Code"
                type="text"
                placeholder="123456"
                icon={KeyRound}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
              <Button type="submit" variant="primary" className="w-full justify-center" icon={ArrowRight}>
                Verify Code
              </Button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <p className="text-xs text-dust-grey-dark dark:text-silver">
                Create a new strong password for your WeSafe account.
              </p>
              <Input
                label="New Password"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Button type="submit" variant="primary" className="w-full justify-center" loading={loading} icon={CheckCircle2}>
                Update Password
              </Button>
            </form>
          )}

          {step === 4 && (
            <div className="text-center space-y-5">
              <Success3DIllustration className="w-24 h-24 mx-auto" />
              <div>
                <h3 className="text-lg font-bold text-wine-plum dark:text-bone">Password Updated</h3>
                <p className="text-xs text-dust-grey-dark dark:text-silver mt-1">
                  You can now sign in with your updated credentials.
                </p>
              </div>
              <Link to="/login">
                <Button variant="primary" className="w-full justify-center">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          )}

          {step < 4 && (
            <div className="pt-2 text-center">
              <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-dust-grey-dark dark:text-silver hover:text-wine-plum dark:hover:text-bone">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Sign In
              </Link>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};
