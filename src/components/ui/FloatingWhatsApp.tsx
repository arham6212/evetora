import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.number.replace(/\D/g, '')}?text=Namaste%20Eventora!%20I%20need%20help%20with%20event%20equipment%20rental.`;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-end flex-col gap-2 pointer-events-none">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="relative max-w-xs bg-white text-slate-800 p-3 rounded-2xl shadow-floating border border-slate-200 pointer-events-auto animate-bounce-subtle">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 p-1 text-slate-400 hover:text-slate-600 rounded-full"
            aria-label="Close message"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-center gap-2 pr-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-badge" />
            <span className="text-xs font-bold text-slate-900">Need a Quick Quote?</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 leading-tight">
            Send us your guest count on WhatsApp for instant pricing & tent sizes.
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Eventora on WhatsApp"
        className="w-13 h-13 sm:w-14 sm:h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all pointer-events-auto group relative"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full" />
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </div>
  );
};
