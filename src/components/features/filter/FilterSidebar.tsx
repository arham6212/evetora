import React from 'react';
import { categories } from '../../../data/categories';
import { ProductFilterState } from '../../../types/product';
import { RotateCcw } from 'lucide-react';
import { formatPrice } from '../../../utils/formatters';

export interface FilterSidebarProps {
  filters: ProductFilterState;
  onChange: (filters: ProductFilterState) => void;
  onReset: () => void;
  totalProducts: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  totalProducts,
}) => {
  const eventTypes = [
    { value: 'all', label: 'All Functions' },
    { value: 'wedding', label: 'Wedding & Haldi (शादी)' },
    { value: 'birthday', label: 'Birthday Party (जन्मदिन)' },
    { value: 'puja', label: 'Puja & Jagran (पूजा)' },
    { value: 'engagement', label: 'Engagement / Roka' },
    { value: 'family', label: 'Family Gathering' },
    { value: 'school', label: 'School / College Event' },
    { value: 'shop', label: 'Shop Opening' },
    { value: 'community', label: 'Community Function' },
  ];

  const handleCategorySelect = (slug: string) => {
    onChange({
      ...filters,
      category: filters.category === slug ? 'all' : slug,
    });
  };

  const handleEventTypeSelect = (type: string) => {
    onChange({
      ...filters,
      eventType: type,
    });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...filters,
      maxPrice: Number(e.target.value),
    });
  };

  const isFiltered =
    filters.category !== 'all' ||
    filters.eventType !== 'all' ||
    filters.search !== '' ||
    filters.maxPrice < 3000;

  return (
    <aside className="space-y-5 text-slate-800">
      {/* Header and Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
            Filters
          </h3>
          <span className="text-[11px] text-slate-400 font-medium">{totalProducts} Items Available</span>
        </div>
        {isFiltered && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 hover:underline font-bold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
          Category
        </span>
        <div className="space-y-1">
          <button
            onClick={() => onChange({ ...filters, category: 'all' })}
            className={`w-full text-left text-xs py-2 px-3 rounded-xl transition-all flex items-center justify-between ${
              filters.category === 'all'
                ? 'bg-emerald-600 text-white font-bold shadow-xs'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>All Categories</span>
          </button>
          {categories.map((cat) => {
            const active = filters.category === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.slug)}
                className={`w-full text-left text-xs py-2 px-3 rounded-xl transition-all flex items-center justify-between ${
                  active
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] font-semibold ${active ? 'text-white/80' : 'text-slate-400'}`}>
                  {cat.itemCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Event Occasion Filter */}
      <div className="space-y-2 pt-3 border-t border-slate-100">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
          By Occasion
        </span>
        <div className="space-y-1">
          {eventTypes.map((et) => {
            const active = filters.eventType === et.value;
            return (
              <button
                key={et.value}
                onClick={() => handleEventTypeSelect(et.value)}
                className={`w-full text-left text-xs py-2 px-3 rounded-xl transition-all flex items-center justify-between ${
                  active
                    ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-300 shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{et.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2.5 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Max Daily Price
          </span>
          <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
            {formatPrice(filters.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min={10}
          max={3000}
          step={20}
          value={filters.maxPrice}
          onChange={handleMaxPriceChange}
          className="w-full accent-emerald-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-medium">
          <span>{formatPrice(10)}</span>
          <span>{formatPrice(3000)}+</span>
        </div>
      </div>
    </aside>
  );
};
