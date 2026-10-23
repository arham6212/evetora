import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, MapPin, ChevronDown, Phone, Armchair, Tent, Utensils, Lightbulb } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { useCart } from '../../context/CartContext';
import { useLocationContext } from '../../context/LocationContext';
import { formatPrice } from '../../utils/formatters';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totals, toggleCart } = useCart();
  const { city, pincode, openLocationModal } = useLocationContext();
  const location = useLocation();

  const navLinks = [
    { label: 'All Items', path: '/rentals' },
    { label: 'Categories', path: '/categories' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Contact', path: '/contact' },
  ];

  const isCurrentPage = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 glass-header border-b border-slate-200/70 transition-all">
      {/* Top Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Left: Mobile Menu + Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-slate-700 hover:text-emerald-600 lg:hidden rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-xl flex items-center justify-center font-extrabold text-lg shadow-sm shadow-emerald-600/30 group-hover:scale-105 transition-transform">
                E
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {siteConfig.brandName}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 hidden sm:inline-block" title="Serving your area" />
                </div>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-400 block -mt-0.5">
                  Local Event Rentals
                </span>
              </div>
            </Link>
          </div>

          {/* Center-Left: City Selector Pill */}
          <button
            onClick={openLocationModal}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100/90 border border-slate-200 rounded-full text-xs font-medium text-slate-800 transition-all shadow-2xs hover:border-emerald-400"
            aria-label="Select delivery city"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <MapPin className="w-3 h-3" />
            </div>
            <div className="text-left">
              <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider block leading-none">City</span>
              <span className="font-bold text-slate-900 flex items-center gap-1">
                {city} <span className="text-slate-400 font-normal text-[11px]">({pincode})</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </span>
            </div>
          </button>

          {/* Desktop Search Trigger Pill */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md mx-2 lg:mx-4">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between px-3.5 py-2 bg-slate-100/90 hover:bg-slate-100 hover:border-slate-300 border border-slate-200/80 rounded-xl text-xs text-slate-500 transition-all shadow-2xs group"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                <span className="truncate">Search chairs, shamiana, stage...</span>
              </div>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] bg-white border border-slate-200/90 rounded-md px-1.5 py-0.5 text-slate-400 font-mono shadow-2xs">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = isCurrentPage(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    active
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons: Search (mobile), Helpline, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 rounded-xl md:hidden transition-colors"
              aria-label="Search items"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Button with Count Pill & Total Amount */}
            <button
              onClick={toggleCart}
              className="flex items-center gap-2.5 px-3.5 py-2 sm:py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl transition-all shadow-sm hover:shadow-md font-bold text-xs sm:text-sm"
              aria-label={`Rental cart with ${totals.totalQuantity} items`}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-white" />
                {totals.totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 text-slate-900 text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                    {totals.totalQuantity}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
              {totals.subtotal > 0 && (
                <span className="hidden md:inline text-xs font-semibold bg-emerald-700/80 px-2 py-0.5 rounded-md">
                  {formatPrice(totals.subtotal)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Location & Category Quick Strip */}
      <div className="lg:hidden border-t border-slate-200/80 bg-white/95 px-4 py-2 flex items-center justify-between gap-3 text-xs">
        <button
          onClick={openLocationModal}
          className="flex items-center gap-1.5 text-slate-700 font-semibold truncate shrink-0"
        >
          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="truncate max-w-[120px]">{city}</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          <Link
            to="/rentals?category=chairs"
            className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 hover:bg-slate-200/80 rounded-full text-slate-700 font-semibold text-[11px]"
          >
            <Armchair className="w-3 h-3 text-emerald-600" />
            <span>Chairs</span>
          </Link>
          <Link
            to="/rentals?category=tents"
            className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 hover:bg-slate-200/80 rounded-full text-slate-700 font-semibold text-[11px]"
          >
            <Tent className="w-3 h-3 text-emerald-600" />
            <span>Shamiana</span>
          </Link>
          <Link
            to="/rentals?category=tables"
            className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 hover:bg-slate-200/80 rounded-full text-slate-700 font-semibold text-[11px]"
          >
            <Utensils className="w-3 h-3 text-emerald-600" />
            <span>Tables</span>
          </Link>
          <Link
            to="/rentals?category=lighting"
            className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 hover:bg-slate-200/80 rounded-full text-slate-700 font-semibold text-[11px]"
          >
            <Lightbulb className="w-3 h-3 text-emerald-600" />
            <span>Lights</span>
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white p-6 flex flex-col justify-between shadow-floating">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-bold text-base">
                    E
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 text-lg block leading-none">
                      {siteConfig.brandName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">
                      Local Event Rentals
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* City Pill in Mobile Menu */}
              <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Delivery City</span>
                    <span className="font-bold text-xs text-slate-900">{city} ({pincode})</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openLocationModal();
                  }}
                  className="text-xs font-bold text-emerald-600 hover:underline"
                >
                  Change
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 space-y-1.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:text-emerald-600 transition-colors"
                  >
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <a
                href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, '')}`}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call Helpline: {siteConfig.contact.phone}</span>
              </a>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  toggleCart();
                }}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View Cart ({totals.totalQuantity} items)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
