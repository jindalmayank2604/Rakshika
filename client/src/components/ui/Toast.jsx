import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const ToastContainer = () => {
  const { toasts } = useNotifications();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isDanger = toast.type === 'danger' || toast.type === 'error';
        const isInfo = !isSuccess && !isDanger;

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-white/90 shadow-xl rounded-2xl p-4 flex items-start gap-3 transition-all transform animate-slide-in"
          >
            {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />}
            {isDanger && <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />}
            {isInfo && <Info className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />}
            
            <div className="flex-1 text-sm font-medium text-slate-800 leading-snug">
              {toast.message}
            </div>
          </div>
        );
      })}
    </div>
  );
};
