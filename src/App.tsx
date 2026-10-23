import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { LocationProvider } from './context/LocationContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { FloatingWhatsApp } from './components/ui/FloatingWhatsApp';
import { CartDrawer } from './components/features/cart/CartDrawer';
import { SearchModal } from './components/features/filter/SearchModal';
import { LocationModal } from './components/features/location/LocationModal';
import { BookingModal } from './components/features/booking/BookingModal';
import { BookingConfirmationModal } from './components/features/booking/BookingConfirmationModal';
import { BookingInquiry } from './types/booking';

// Pages
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top helper on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const AppContent: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [confirmedInquiry, setConfirmedInquiry] = useState<BookingInquiry | null>(null);

  // Global Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 pb-16 lg:pb-0">
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Content View */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={<HomePage onOpenBooking={() => setIsBookingOpen(true)} />}
          />
          <Route path="/rentals" element={<CatalogPage />} />
          <Route path="/rentals/:slug" element={<ProductDetailPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/cart"
            element={<CartPage onOpenBooking={() => setIsBookingOpen(true)} />}
          />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />

      {/* Mobile Floating Bottom Nav & WhatsApp Widget */}
      <MobileBottomNav />
      <FloatingWhatsApp />

      {/* Drawers and Modals */}
      <CartDrawer onProceedToInquiry={() => setIsBookingOpen(true)} />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <LocationModal />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSuccess={(inquiry) => setConfirmedInquiry(inquiry)}
      />
      <BookingConfirmationModal
        isOpen={confirmedInquiry !== null}
        onClose={() => setConfirmedInquiry(null)}
        inquiry={confirmedInquiry}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LocationProvider>
        <CartProvider>
          <WishlistProvider>
            <AppContent />
          </WishlistProvider>
        </CartProvider>
      </LocationProvider>
    </BrowserRouter>
  );
};

export default App;
