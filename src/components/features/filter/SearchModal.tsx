import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { products } from '../../../data/products';
import { formatPrice } from '../../../utils/formatters';

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const searchResults = trimmed
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          (p.hindiName && p.hindiName.toLowerCase().includes(trimmed)) ||
          p.categoryName.toLowerCase().includes(trimmed) ||
          p.tagline.toLowerCase().includes(trimmed) ||
          p.tags.some((t) => t.toLowerCase().includes(trimmed))
      )
    : [];

  const handleSelect = (slug: string) => {
    onClose();
    navigate(`/rentals/${slug}`);
  };

  const handleViewAll = () => {
    onClose();
    navigate(`/rentals?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/60 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative mx-auto max-w-xl bg-white rounded-lg shadow-floating overflow-hidden z-10 border border-brand-sand">
        {/* Search Bar */}
        <div className="relative flex items-center px-4 py-3 border-b border-brand-sand bg-white">
          <Search className="w-5 h-5 text-brand-taupe shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                handleViewAll();
              }
            }}
            placeholder="Search plastic chairs, shamiana, tables, lights, carpets..."
            className="w-full pl-3 pr-8 py-1 text-sm bg-transparent border-none text-brand-charcoal placeholder:text-brand-taupe focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-brand-taupe hover:text-brand-charcoal"
              aria-label="Clear"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="p-1 text-brand-taupe hover:text-brand-charcoal"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results or Quick Suggestions */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="space-y-3 py-2">
              <span className="text-xs uppercase font-bold text-brand-taupe tracking-wider block">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Plastic Chair',
                  'Shamiana Tent',
                  'Buffet Table',
                  'Round Table',
                  'Haldi Drapes',
                  'Red Carpet',
                  'PA Sound System',
                  'LED Floodlight',
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-sand-light hover:bg-brand-sand text-brand-charcoal text-xs font-medium rounded-md border border-brand-sand transition-colors"
                  >
                    <Tag className="w-3 h-3 text-brand-primary" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-brand-sand text-xs text-brand-taupe">
                <span>Found {searchResults.length} items</span>
                <button
                  onClick={handleViewAll}
                  className="text-brand-primary font-bold hover:underline flex items-center gap-1"
                >
                  <span>View All in Catalogue</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="divide-y divide-brand-sand">
                {searchResults.slice(0, 6).map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSelect(product.slug)}
                    className="w-full text-left py-2.5 px-2 flex items-center gap-3 hover:bg-brand-sand-light rounded-md transition-colors group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-md object-cover bg-brand-sand-light shrink-0 border border-brand-sand"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-brand-charcoal group-hover:text-brand-primary transition-colors truncate">
                        {product.name}
                      </h4>
                      {product.hindiName && (
                        <span className="text-[11px] text-brand-taupe block truncate">
                          {product.hindiName}
                        </span>
                      )}
                      <p className="text-[11px] text-brand-charcoal/70 truncate">
                        {product.tagline}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold text-brand-charcoal block">
                        {formatPrice(product.rentalPrice)}
                      </span>
                      <span className="text-[10px] text-brand-taupe lowercase">
                        /{product.pricingUnit.replace('per ', '')}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-8 text-center space-y-2">
              <p className="text-sm font-bold text-brand-charcoal">
                No items found for "{query}"
              </p>
              <p className="text-xs text-brand-taupe">
                Try searching for chairs, tent, table, sound, or carpet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
