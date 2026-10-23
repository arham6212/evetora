import React from 'react';
import { categories } from '../data/categories';
import { CategoryCard } from '../components/cards/CategoryCard';
import { useLocationContext } from '../context/LocationContext';
import { MapPin } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { city } = useLocationContext();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Local Inventory • {city}</span>
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Browse by Equipment Category
        </h1>
        <p className="text-xs sm:text-base text-slate-500 max-w-2xl leading-relaxed">
          From sturdy plastic chairs, waterproof shamiana pandals, and buffet tables to guest bedding sets, catering degs, and sound systems, find everything you need for your local event.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};
