import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  position?: 'right' | 'left';
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  position = 'right',
  children,
  footer,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-brand-charcoal/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`fixed inset-y-0 ${
          position === 'right' ? 'right-0' : 'left-0'
        } max-w-full flex pl-10`}
      >
        <div className="w-screen max-w-md sm:max-w-lg bg-brand-ivory border-l border-brand-sand shadow-floating flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-brand-sand/80 flex items-center justify-between bg-brand-ivory">
            <div>
              {subtitle && (
                <span className="text-[10px] tracking-widest text-brand-olive uppercase block mb-0.5 font-medium">
                  {subtitle}
                </span>
              )}
              {title && (
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-brand-charcoal">
                  {title}
                </h3>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-brand-charcoal/60 hover:text-brand-charcoal hover:bg-brand-sand/50 rounded-full transition-colors"
              aria-label="Close panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {children}
          </div>

          {/* Optional Drawer Footer */}
          {footer && (
            <div className="border-t border-brand-sand/80 px-6 py-5 bg-brand-sand/20">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
