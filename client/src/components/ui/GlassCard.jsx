import React from 'react';

export const GlassCard = ({
  children,
  className = '',
  hoverEffect = false,
  variant = 'default',
  onClick,
  ...props
}) => {
  const baseClasses = 'backdrop-blur-md rounded-2xl border transition-all duration-300';
  
  const variants = {
    default: 'bg-white/75 border-white/80 shadow-glass',
    subtle: 'bg-white/50 border-white/50 shadow-sm',
    solid: 'bg-white/95 border-slate-100 shadow-card',
    emergency: 'bg-rose-50/80 border-rose-200/80 shadow-emergency-glow',
    indigo: 'bg-indigo-50/70 border-indigo-100 shadow-sm'
  };

  const hoverClasses = hoverEffect ? 'hover:-translate-y-1 hover:shadow-glass-hover hover:bg-white/85 cursor-pointer' : '';

  return (
    <div
      className={`${baseClasses} ${variants[variant] || variants.default} ${hoverClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};
