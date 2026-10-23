import React from 'react';
import { siteConfig } from '../../data/siteConfig';
import { Phone, MessageCircle } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-slate-900 text-white text-[11px] sm:text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Value Proposition */}
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-badge" />
            <span>Local Delivery & Setup</span>
          </span>
          <span className="hidden md:inline text-slate-300">
            Nilkamal plastic chairs, shamianas, stage decks & catering degs delivered to your venue
          </span>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${siteConfig.whatsapp.number.replace(/\D/g, '')}?text=Namaste%20Eventora!%20I%20have%20an%20event%20rental%20inquiry.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-white font-medium transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">WhatsApp Quote</span>
          </a>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <a
            href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, '')}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Help: <span className="font-medium text-white">{siteConfig.contact.phone}</span></span>
          </a>
        </div>
      </div>
    </div>
  );
};
