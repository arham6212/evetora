import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { CategoryCard } from '../components/cards/CategoryCard';
import { useLocationContext } from '../context/LocationContext';
import { MapPin, Sparkles, MessageCircle, HelpCircle } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const CategoriesPage: React.FC = () => {
  const { city } = useLocationContext();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Local Inventory • {city}</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-slate-500 font-semibold">{categories.length} Categories</span>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-slate-500 font-semibold">{products.length} Equipment Items</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Browse by Equipment Category
        </h1>
        <p className="text-xs sm:text-base text-slate-500 max-w-2xl leading-relaxed">
          From sturdy plastic chairs, waterproof shamiana pandals, and buffet tables to guest bedding sets, catering degs, and sound systems, find everything you need for your local event in {city}.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {/* Helpful Support Banner */}
      <div className="p-6 sm:p-8 bg-slate-900 text-white rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1.5 text-center md:text-left max-w-xl">
          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Need Help Choosing Categories?</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Unsure how many chairs, tables or tent sizes you require?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Send your guest count and function type on WhatsApp. Our local tent house coordinator will recommend the ideal category package.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <Link
            to="/how-it-works"
            className="w-full sm:w-auto px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-colors text-center border border-white/10 flex items-center justify-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4 text-slate-300" />
            <span>How Rentals Work</span>
          </Link>
          <a
            href={`https://wa.me/${siteConfig.whatsapp.number.replace(/\D/g, '')}?text=Namaste%20Evento!%20I%20need%20advice%20on%20rental%20categories.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
