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
    <aside className="space-y-5 text-brand-charcoal">
      {/* Header and Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-brand-sand">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">
            Filters
          </h3>
          <span className="text-[11px] text-brand-taupe">{totalProducts} Items Available</span>
        </div>
        {isFiltered && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 text-[11px] text-brand-primary hover:underline font-semibold"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="space-y-2.5">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-charcoal block">
          Category
        </span>
        <div className="space-y-1">
          <button
            onClick={() => onChange({ ...filters, category: 'all' })}
            className={`w-full text-left text-xs py-1.5 px-2 rounded transition-colors flex items-center justify-between ${
              filters.category === 'all'
                ? 'bg-brand-primary text-white font-semibold'
                : 'text-brand-charcoal hover:bg-brand-sand-light'
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
                className={`w-full text-left text-xs py-1.5 px-2 rounded transition-colors flex items-center justify-between ${
                  active
                    ? 'bg-brand-primary text-white font-semibold'
                    : 'text-brand-charcoal hover:bg-brand-sand-light'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] ${active ? 'text-white/80' : 'text-brand-taupe'}`}>
                  {cat.itemCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Event Occasion Filter */}
      <div className="space-y-2.5 pt-3 border-t border-brand-sand">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-charcoal block">
          By Event Type
        </span>
        <div className="space-y-1">
          {eventTypes.map((et) => {
            const active = filters.eventType === et.value;
            return (
              <button
                key={et.value}
                onClick={() => handleEventTypeSelect(et.value)}
                className={`w-full text-left text-xs py-1.5 px-2 rounded transition-colors flex items-center justify-between ${
                  active
                    ? 'bg-brand-primary-soft text-brand-primary font-bold border border-brand-primary/30'
                    : 'text-brand-charcoal hover:bg-brand-sand-light'
                }`}
              >
                <span>{et.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2.5 pt-3 border-t border-brand-sand">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">
            Max Price
          </span>
          <span className="text-xs font-bold text-brand-primary">
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
          className="w-full accent-brand-primary cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-brand-taupe">
          <span>{formatPrice(10)}</span>
          <span>{formatPrice(3000)}+</span>
        </div>
      </div>
    </aside>
  );
};
