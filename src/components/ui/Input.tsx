import React from 'react';
import { clsx } from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs uppercase tracking-wider font-medium text-brand-charcoal/80"
          >
            {label}
            {props.required && <span className="text-amber-800 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full px-4 py-2.5 text-sm bg-white border border-brand-sand rounded-xs text-brand-charcoal placeholder:text-brand-taupe/60 transition-colors focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal disabled:bg-brand-sand/30 disabled:cursor-not-allowed',
            error && 'border-red-400 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-brand-charcoal/60 mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
