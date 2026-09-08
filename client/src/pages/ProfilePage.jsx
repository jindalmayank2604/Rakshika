import React, { useState } from 'react';
import { User, Mail, Phone, ShieldCheck, Camera, Save } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

export const ProfilePage = () => {
  const { user, updateProfileData } = useAuth();
  const { showToast } = useNotifications();

  const [formData, setFormData] = useState({
    name: user?.name || 'Priya Sharma',
    email: user?.email || 'priya@example.com',
    phone: user?.phone || '+91 98123 45678'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfileData(formData);
    showToast('Profile details updated successfully.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
            Account Management
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          User Profile
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Manage your personal safety profile, contact details, and credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Profile Card */}
        <div className="md:col-span-4">
          <GlassCard className="p-6 text-center space-y-4">
            <div className="relative w-24 h-24 mx-auto">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-primary-500 to-teal-400 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg">
                {formData.name[0]}
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 p-2 rounded-full bg-slate-900 text-white hover:bg-primary-600 shadow-md transition-colors"
                title="Change Avatar"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">{formData.name}</h3>
              <p className="text-xs text-slate-500">{formData.email}</p>
            </div>

            <div className="pt-2">
              <Badge variant="primary">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Rakshika User
              </Badge>
            </div>
          </GlassCard>
        </div>

        {/* Right Form */}
        <div className="md:col-span-8">
          <GlassCard className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                icon={User}
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                icon={Mail}
                required
              />

              <Input
                label="Mobile Number (Primary)"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                icon={Phone}
                required
              />

              <div className="pt-3">
                <Button type="submit" variant="primary" icon={Save}>
                  Save Changes
                </Button>
              </div>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
