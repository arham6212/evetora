import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, MapPin, ShoppingBag, Layers } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLocationContext } from '../../context/LocationContext';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { totals, toggleCart } = useCart();
  const { city, openLocationModal } = useLocationContext();

  const isHome = location.pathname === '/';
  const isCatalog = location.pathname.startsWith('/rentals');
  const isCategories = location.pathname.startsWith('/categories');

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 lg:hidden shadow-lg safe-bottom">
      <div className="grid grid-cols-5 h-15 items-center">
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            isHome ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </Link>

        {/* Catalog */}
        <Link
          to="/rentals"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            isCatalog ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Items</span>
        </Link>

        {/* Categories */}
        <Link
          to="/categories"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            isCategories ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Categories</span>
        </Link>

        {/* City */}
        <button
          onClick={openLocationModal}
          className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <MapPin className="w-5 h-5 text-emerald-600" />
          <span className="text-[10px] mt-0.5 truncate max-w-[55px] font-medium">{city}</span>
        </button>

        {/* Cart */}
        <button
          onClick={toggleCart}
          className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-900 transition-colors relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {totals.totalQuantity > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-emerald-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {totals.totalQuantity}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 font-medium">Cart</span>
        </button>
      </div>
    </div>
  );
};
