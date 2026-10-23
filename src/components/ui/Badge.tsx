import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'olive' | 'gold' | 'charcoal' | 'outline' | 'emerald' | 'amber';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className,
}) => {
  const base = 'inline-flex items-center font-medium rounded-full select-none';

  const variants = {
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200/80',
    olive: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    emerald: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-semibold',
    gold: 'bg-amber-50 text-amber-800 border border-amber-200/80 font-semibold',
    amber: 'bg-amber-50 text-amber-800 border border-amber-200/80 font-semibold',
    charcoal: 'bg-slate-900 text-white',
    outline: 'border border-slate-300 text-slate-700 bg-white',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px] tracking-wide',
    md: 'px-2.5 py-1 text-xs tracking-normal',
  };

  return (
    <span className={twMerge(clsx(base, variants[variant], sizes[size], className))}>
      {children}
    </span>
  );
};
