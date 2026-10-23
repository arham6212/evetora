import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle } from 'lucide-react';
import { siteConfig, popularCities } from '../../data/siteConfig';
import { categories } from '../../data/categories';
import { useLocationContext } from '../../context/LocationContext';

export const Footer: React.FC = () => {
  const { setCity } = useLocationContext();

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-xl flex items-center justify-center font-extrabold text-lg shadow-sm">
                E
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                {siteConfig.brandName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              {siteConfig.tagline}. Affordable and dependable rentals of chairs, tables, shamiana tents, sound systems, and catering degs for family gatherings, weddings, and local celebrations.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, '')}`}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call: {siteConfig.contact.phone}</span>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp.number.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white transition-colors shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 text-white" />
                <span>WhatsApp Helpline</span>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Rental Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/rentals?category=${cat.slug}`}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/categories" className="text-emerald-400 font-semibold hover:underline">
                  All Categories ({categories.length}) →
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Help */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/how-it-works" className="hover:text-emerald-400 transition-colors">
                  How Rentals Work
                </Link>
              </li>
              <li>
                <Link to="/rentals" className="hover:text-emerald-400 transition-colors">
                  Full Price List
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  About Evento
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Cities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Service Cities
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {popularCities.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCity(c.name)}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg text-[11px] font-medium transition-colors"
                >
                  {c.name}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Serving 15+ Tier-2 and Tier-3 cities in India.
            </p>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} {siteConfig.brandName}. Designed for Indian families & local events.</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-600">Demo Prototype</span>
            <span>•</span>
            <span className="text-slate-400">No Advance Payment Required</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
