import React, { useState } from 'react';
import { User, Mail, Phone, ShieldCheck, Camera, Save } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
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
    showToast('WeSafe profile details updated successfully.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-wine-plum dark:text-silver">
            Account Management
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-wine-plum dark:text-bone tracking-tight">
          User Profile
        </h2>
        <p className="text-xs sm:text-sm text-dust-grey-dark dark:text-silver mt-0.5">
          Manage your personal safety profile, contact details, and credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Profile Card */}
        <div className="md:col-span-4">
          <GlassCard className="p-6 text-center space-y-4 border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-sm">
            <div className="relative w-24 h-24 mx-auto">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-wine-plum to-smoky-rose flex items-center justify-center text-bone text-3xl font-extrabold shadow-lg">
                {formData.name[0]}
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 p-2 rounded-full bg-wine-plum text-bone hover:bg-smoky-rose shadow-md transition-colors border border-bone/30"
                title="Change Avatar"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <h3 className="text-base font-bold text-wine-plum dark:text-bone">{formData.name}</h3>
              <p className="text-xs text-dust-grey-dark dark:text-silver">{formData.email}</p>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-powder-petal/80 dark:bg-wine-plum/80 text-wine-plum dark:text-bone font-bold text-xs border border-dust-grey/60 dark:border-smoky-rose/30">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                Verified WeSafe Member
              </span>
            </div>
          </GlassCard>
        </div>

        {/* Right Form */}
        <div className="md:col-span-8">
          <GlassCard className="p-6 sm:p-8 border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-sm">
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
