import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, AlertOctagon, PhoneCall, X, CheckCircle, Navigation, MapPin } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useSafety } from '../../context/SafetyContext';
import { useNotifications } from '../../context/NotificationContext';

export const SOSButton = ({ isModal = false, onClose }) => {
  const { sosActive, triggerSOS, cancelSOS, contacts, currentLocation } = useSafety();
  const { showToast } = useNotifications();
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [countDown, setCountDown] = useState(3);
  const timerRef = useRef(null);
  const holdIntervalRef = useRef(null);

  const HOLD_DURATION = 3000; // 3 seconds hold

  const startHold = (e) => {
    e.preventDefault();
    if (sosActive) return;
    setHolding(true);
    setProgress(0);

    const startTime = Date.now();
    holdIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / HOLD_DURATION) * 100);
      setProgress(pct);

      if (elapsed >= HOLD_DURATION) {
        clearInterval(holdIntervalRef.current);
        triggerEmergency();
      }
    }, 30);
  };

  const endHold = (e) => {
    e?.preventDefault();
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
    }
    setHolding(false);
    setProgress(0);
  };

  const triggerEmergency = () => {
    setHolding(false);
    setProgress(0);
    triggerSOS();
    setShowAlertModal(true);
    showToast('SOS Alert Activated! Emergency circle notified.', 'danger', 6000);
  };

  const handleCancelSOS = () => {
    cancelSOS();
    setShowAlertModal(false);
    showToast('SOS Alert cancelled.', 'info');
    if (onClose) onClose();
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center select-none py-4">
        {/* Press and Hold Radial Container */}
        <div className="relative flex items-center justify-center">
          {/* Radial Progress Ring */}
          <svg className="w-56 h-56 -rotate-90" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="84"
              stroke="#FFE4E6"
              strokeWidth="12"
              fill="transparent"
            />
            <circle
              cx="100"
              cy="100"
              r="84"
              stroke="#E11D48"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={527}
              strokeDashoffset={527 - (527 * progress) / 100}
              strokeLinecap="round"
              className="transition-all duration-75 ease-linear"
            />
          </svg>

          {/* SOS Touch Circle */}
          <button
            onMouseDown={startHold}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
            className={`absolute w-40 h-40 rounded-full flex flex-col items-center justify-center text-white shadow-2xl transition-all active:scale-95 cursor-pointer ${
              sosActive
                ? 'bg-emergency sos-pulse'
                : holding
                ? 'bg-rose-700 scale-95 shadow-emergency-glow'
                : 'bg-gradient-to-tr from-rose-600 via-rose-500 to-rose-400 hover:shadow-emergency-glow'
            }`}
            aria-label="Hold for 3 seconds to activate SOS emergency alert"
          >
            <ShieldAlert className={`w-12 h-12 mb-1 ${holding ? 'animate-bounce' : ''}`} />
            <span className="text-xl font-extrabold tracking-wider">
              {sosActive ? 'ACTIVE' : holding ? `${Math.ceil((100 - progress) / 33.3)}s` : 'SOS'}
            </span>
            <span className="text-[10px] font-medium text-rose-100 uppercase tracking-widest mt-0.5">
              {holding ? 'KEEP HOLDING' : 'HOLD 3 SEC'}
            </span>
          </button>
        </div>

        <p className="text-xs text-slate-500 text-center mt-5 font-medium max-w-xs">
          Press and hold for 3 seconds to trigger an instant emergency alert to your safety circle.
        </p>
      </div>

      {/* SOS Active Alert Modal */}
      <Modal
        isOpen={showAlertModal || sosActive}
        onClose={() => setShowAlertModal(false)}
        maxWidth="max-w-md"
        showClose={false}
      >
        <div className="text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto animate-pulse">
            <AlertOctagon className="w-9 h-9" />
          </div>

          <div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Emergency SOS Triggered
            </h3>
            <p className="text-xs text-rose-600 font-bold uppercase tracking-wider mt-1">
              Simulated Emergency Broadcast Active
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 text-left space-y-3">
            <div className="flex items-start gap-2.5 text-xs text-slate-700">
              <MapPin className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Live GPS Sent:</span>
                <p className="text-slate-600">{currentLocation.address} ({currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)})</p>
              </div>
            </div>

            <div className="pt-2 border-t border-rose-200/60">
              <p className="text-xs font-bold text-slate-800 mb-1.5">Alerted Safety Contacts ({contacts.length}):</p>
              <div className="space-y-1">
                {contacts.map((c) => (
                  <div key={c.id} className="flex items-center justify-between text-xs text-slate-600">
                    <span>{c.name} ({c.relationship})</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100/80 px-2 py-0.5 rounded">SMS Dispatched</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 leading-snug">
            ⚠️ <strong>Safety Notice:</strong> This is a web application safety simulation. For life-threatening emergencies, immediately dial national emergency <strong>112</strong> or Women Helpline <strong>1091</strong>.
          </div>

          <div className="flex gap-3">
            <Button
              variant="emergency"
              className="flex-1"
              icon={PhoneCall}
              onClick={() => window.open('tel:112')}
            >
              Call 112
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleCancelSOS}
            >
              Cancel SOS
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
