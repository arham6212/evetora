import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { products } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { useLocationContext } from '../context/LocationContext';
import { ProductCard } from '../components/cards/ProductCard';
import { Button } from '../components/ui/Button';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useWishlist();
  const { city } = useLocationContext();
  const navigate = useNavigate();

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Saved Wishlist</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            Delivery in {city}
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Saved Favorites ({favoriteProducts.length})
        </h1>
        <p className="text-xs sm:text-base text-slate-500 max-w-2xl leading-relaxed">
          Your bookmarked event equipment selections. Easily review, adjust quantities, and add items directly to your rental cart.
        </p>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="py-16 text-center bg-white border border-slate-200/90 rounded-3xl p-8 space-y-4 shadow-2xs">
          <div className="w-16 h-16 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            You haven't saved any items yet
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            Click the heart icon on any plastic chair, shamiana, buffet table, or sound system to save it for your event.
          </p>
          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/rentals')}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="bg-emerald-600 hover:bg-emerald-700 font-bold shadow-md shadow-emerald-600/20"
            >
              Explore Equipment
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
