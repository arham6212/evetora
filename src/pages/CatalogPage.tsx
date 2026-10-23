import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, X, MapPin } from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { ProductFilterState } from '../types/product';
import { ProductCard } from '../components/cards/ProductCard';
import { FilterSidebar } from '../components/features/filter/FilterSidebar';
import { FilterDrawer } from '../components/features/filter/FilterDrawer';
import { SortDropdown } from '../components/features/filter/SortDropdown';
import { Button } from '../components/ui/Button';
import { useLocationContext } from '../context/LocationContext';

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const { city } = useLocationContext();

  const [filters, setFilters] = useState<ProductFilterState>({
    category: searchParams.get('category') || 'all',
    search: searchParams.get('search') || '',
    eventType: searchParams.get('eventType') || 'all',
    minPrice: 0,
    maxPrice: 3000,
    sortBy: (searchParams.get('sort') as any) || 'recommended',
  });

  useEffect(() => {
    const urlCategory = searchParams.get('category') || 'all';
    const urlSearch = searchParams.get('search') || '';
    const urlEventType = searchParams.get('eventType') || 'all';
    setFilters((prev) => ({
      ...prev,
      category: urlCategory,
      search: urlSearch,
      eventType: urlEventType,
    }));
  }, [searchParams]);

  const handleFilterChange = (newFilters: ProductFilterState) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (newFilters.category !== 'all') params.set('category', newFilters.category);
    if (newFilters.eventType !== 'all') params.set('eventType', newFilters.eventType);
    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.sortBy !== 'recommended') params.set('sort', newFilters.sortBy);
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    const resetState: ProductFilterState = {
      category: 'all',
      search: '',
      eventType: 'all',
      minPrice: 0,
      maxPrice: 3000,
      sortBy: 'recommended',
    };
    setFilters(resetState);
    setSearchParams(new URLSearchParams());
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (filters.category !== 'all' && p.categoryId !== filters.category) {
          return false;
        }
        if (
          filters.eventType !== 'all' &&
          !p.eventTypes.includes(filters.eventType as any)
        ) {
          return false;
        }
        if (p.rentalPrice > filters.maxPrice) {
          return false;
        }
        if (filters.search.trim()) {
          const q = filters.search.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchHindi = p.hindiName ? p.hindiName.toLowerCase().includes(q) : false;
          const matchCat = p.categoryName.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchTagline = p.tagline.toLowerCase().includes(q);
          const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchHindi && !matchCat && !matchDesc && !matchTagline && !matchTags) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.rentalPrice - b.rentalPrice;
        if (filters.sortBy === 'price-desc') return b.rentalPrice - a.rentalPrice;
        if (filters.sortBy === 'name-asc') return a.name.localeCompare(b.name);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [filters]);

  const activeCategoryName =
    categories.find((c) => c.slug === filters.category)?.name || 'All Equipment';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <MapPin className="w-3 h-3 text-emerald-600" />
            <span>Serving {city}</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 font-semibold">{filteredProducts.length} Verified Items</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Event Equipment for Rent
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
          Browse clean plastic chairs, banquet seating, shamiana pandals, buffet tables, and floodlights. Daily rates with local tempo delivery.
        </p>
      </div>

      {/* Search & Category Pills */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search chairs, shamiana, tables, lights, mic..."
              value={filters.search}
              onChange={(e) =>
                handleFilterChange({ ...filters, search: e.target.value })
              }
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 shadow-2xs transition-colors"
            />
            {filters.search && (
              <button
                onClick={() => handleFilterChange({ ...filters, search: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Controls: Filter Button & Sort */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold border border-slate-200 bg-white text-slate-800 rounded-xl shadow-2xs hover:bg-slate-50"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />
              <span>Filters</span>
            </button>

            <SortDropdown
              value={filters.sortBy}
              onChange={(newSort) =>
                handleFilterChange({ ...filters, sortBy: newSort })
              }
            />
          </div>
        </div>

        {/* Category Filter Pills (Horizontal scroll on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none pt-1">
          <button
            onClick={() => handleFilterChange({ ...filters, category: 'all' })}
            className={`shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-full border transition-all ${
              filters.category === 'all'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            All Items ({products.length})
          </button>
          {categories.map((cat) => {
            const active = filters.category === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => handleFilterChange({ ...filters, category: cat.slug })}
                className={`shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-full border transition-all ${
                  active
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-2">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28 bg-white border border-slate-200/90 p-5 rounded-3xl shadow-2xs">
            <FilterSidebar
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
              totalProducts={filteredProducts.length}
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Active Filter Badges */}
          {(filters.category !== 'all' ||
            filters.eventType !== 'all' ||
            filters.search) && (
            <div className="flex flex-wrap items-center gap-2 mb-5 p-3 bg-white border border-slate-200/90 rounded-2xl text-xs shadow-2xs">
              <span className="font-bold text-slate-400">Active:</span>
              {filters.category !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold">
                  {activeCategoryName}
                  <button onClick={() => handleFilterChange({ ...filters, category: 'all' })}>
                    <X className="w-3.5 h-3.5 ml-0.5 text-emerald-700 hover:text-emerald-900" />
                  </button>
                </span>
              )}
              {filters.eventType !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 text-white rounded-full text-xs font-bold capitalize">
                  {filters.eventType}
                  <button onClick={() => handleFilterChange({ ...filters, eventType: 'all' })}>
                    <X className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                </span>
              )}
              {filters.search && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-semibold text-slate-800">
                  "{filters.search}"
                  <button onClick={() => handleFilterChange({ ...filters, search: '' })}>
                    <X className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-xs text-emerald-600 font-bold hover:underline ml-auto"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Results Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="p-10 sm:p-14 text-center bg-white border border-slate-200/90 rounded-3xl space-y-3 shadow-2xs">
              <div className="w-12 h-12 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                No rental items match your filters
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try clearing search terms or selecting "All Items" to browse our full inventory.
              </p>
              <Button variant="secondary" onClick={handleResetFilters}>
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <FilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
        totalProducts={filteredProducts.length}
      />
    </div>
  );
};
