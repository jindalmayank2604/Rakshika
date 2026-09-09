import React, { useState } from 'react';
import { Users, Plus, Phone, MessageSquare, ShieldCheck, Heart, Trash2 } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { EmergencyContactCard } from '../components/safety/EmergencyContactCard';
import { useSafety } from '../context/SafetyContext';
import { useNotifications } from '../context/NotificationContext';

export const EmergencyContactsPage = () => {
  const { contacts, addContact, deleteContact } = useSafety();
  const { showToast } = useNotifications();
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relationship: 'Sister',
    is_primary: false
  });

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('Name and phone are required.', 'danger');
      return;
    }

    setLoading(true);
    try {
      await addContact(formData);
      showToast(`Added ${formData.name} to your emergency circle.`, 'success');
      setShowAddModal(false);
      setFormData({ name: '', phone: '', relationship: 'Sister', is_primary: false });
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateCall = (contact) => {
    showToast(`Simulating direct voice call to ${contact.name} (${contact.phone})...`, 'info', 4000);
  };

  const handleSimulateSMS = (contact) => {
    showToast(`Dispatched test emergency alert SMS to ${contact.name}!`, 'success', 4000);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this emergency contact?')) {
      await deleteContact(id);
      showToast('Contact removed from emergency circle.', 'info');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-wine-plum dark:text-silver">
              Personal SOS Network
            </span>
            <span className="text-[10px] bg-powder-petal dark:bg-wine-plum text-wine-plum dark:text-bone font-bold px-2 py-0.5 rounded-full border border-dust-grey/60 dark:border-smoky-rose/30">
              {contacts.length} Configured
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-wine-plum dark:text-bone tracking-tight">
            Emergency Contacts & Safety Circle
          </h2>
          <p className="text-xs sm:text-sm text-dust-grey-dark dark:text-silver mt-0.5">
            Trusted contacts who receive your real-time GPS coordinates when you trigger SOS or start safe journey sharing.
          </p>
        </div>

        <Button variant="primary" icon={Plus} onClick={() => setShowAddModal(true)}>
          Add New Contact
        </Button>
      </div>

      {/* Advisory Banner */}
      <div className="p-4 rounded-2xl bg-powder-petal/60 dark:bg-wine-plum/60 border border-dust-grey/60 dark:border-smoky-rose/30 flex items-start gap-3 shadow-warm-sm">
        <ShieldCheck className="w-5 h-5 text-accent dark:text-almond-dark flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-wine-plum dark:text-bone">How WeSafe Emergency Circle Works:</h4>
          <p className="text-xs text-dust-grey-dark dark:text-silver mt-0.5 leading-relaxed">
            When SOS is held for 3 seconds, your primary and secondary contacts will immediately receive automated SMS notifications with your live GPS location and safe corridor link.
          </p>
        </div>
      </div>

      {/* Contacts List */}
      <div className="space-y-3">
        {contacts.map((contact) => (
          <EmergencyContactCard
            key={contact.id}
            contact={contact}
            onDelete={handleDelete}
            onCallSimulate={handleSimulateCall}
            onSmsSimulate={handleSimulateSMS}
          />
        ))}
      </div>

      {/* Add Contact Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Emergency Contact"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="e.g. Ananya Sharma"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="+91 98234 56789"
            icon={Phone}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-wine-plum dark:text-silver">Relationship</label>
            <select
              value={formData.relationship}
              onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
              className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm"
            >
              <option value="Sister">Sister</option>
              <option value="Brother">Brother</option>
              <option value="Mother">Mother</option>
              <option value="Father">Father</option>
              <option value="Friend">Friend</option>
              <option value="Colleague / Mentor">Colleague / Mentor</option>
              <option value="Partner">Partner</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-xs text-wine-plum dark:text-bone cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={formData.is_primary}
              onChange={(e) => setFormData({ ...formData, is_primary: e.target.checked })}
              className="rounded border-dust-grey text-wine-plum focus:ring-accent"
            />
            <span className="font-semibold">Set as Primary Emergency Responder</span>
          </label>

          <div className="flex gap-3 pt-3">
            <Button type="submit" variant="primary" className="flex-1" loading={loading}>
              Save Contact
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
