import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export interface SortDropdownProps {
  value: 'recommended' | 'price-asc' | 'price-desc' | 'name-asc';
  onChange: (value: 'recommended' | 'price-asc' | 'price-desc' | 'name-asc') => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase tracking-wider text-brand-taupe font-medium hidden sm:inline flex items-center gap-1">
        <ArrowUpDown className="w-3.5 h-3.5" />
        Sort:
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as any)}
        className="text-xs bg-white border border-brand-sand rounded-xs px-3 py-2 text-brand-charcoal focus:outline-none focus:border-brand-charcoal cursor-pointer font-medium"
      >
        <option value="recommended">Curated / Recommended</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
      </select>
    </div>
  );
};
