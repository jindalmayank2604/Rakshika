import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
  size = 'sm',
  className = ''
}) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    primary: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200'
  };

  const sizes = {
    xs: 'text-[10px] px-2 py-0.5 font-medium rounded-md',
    sm: 'text-xs px-2.5 py-1 font-semibold rounded-lg',
    md: 'text-sm px-3 py-1.5 font-semibold rounded-xl'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 border ${variants[variant] || variants.default} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};
