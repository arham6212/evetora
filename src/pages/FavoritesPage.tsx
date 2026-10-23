import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/cards/ProductCard';
import { Button } from '../components/ui/Button';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useWishlist();
  const navigate = useNavigate();

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="max-w-2xl space-y-2">
        <span className="text-[11px] uppercase tracking-widest font-semibold text-brand-olive block">
          Curated Wishlist
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-brand-charcoal">
          Saved Favorites ({favoriteProducts.length})
        </h1>
        <p className="text-xs sm:text-sm text-brand-charcoal/70 leading-relaxed font-light">
          Your bookmarked event equipment selections. Easily review, adjust, and add them to your rental cart.
        </p>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="py-20 text-center bg-white border border-brand-sand rounded-xs p-8 space-y-4 shadow-subtle">
          <div className="w-14 h-14 mx-auto bg-brand-sand-light rounded-full flex items-center justify-center text-brand-taupe">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl text-brand-charcoal font-medium">
            You haven't saved any items yet
          </h2>
          <p className="text-xs text-brand-charcoal/60 max-w-sm mx-auto">
            Click the heart icon on any chair, tent, table, or lighting fixture to save items to your event moodboard.
          </p>
          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/rentals')}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Explore Equipment
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
