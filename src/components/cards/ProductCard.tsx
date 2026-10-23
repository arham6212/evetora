import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, Minus, Sparkles } from 'lucide-react';
import { Product } from '../../types/product';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, items, updateQuantity, removeItem } = useCart();
  const { isFavorite, toggleFavorite } = useWishlist();

  const favorite = isFavorite(product.id);
  const cartItem = items.find((item) => item.productId === product.id);
  const minQty = product.minQuantity || 1;
  const step = minQty > 1 ? minQty : 1;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, minQty);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(cartItem.id, cartItem.quantity + step);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      const nextQty = cartItem.quantity - step;
      if (nextQty <= 0) {
        removeItem(cartItem.id);
      } else {
        updateQuantity(cartItem.id, nextQty);
      }
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <div className="group relative flex flex-col bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:border-emerald-500/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Product Image Frame */}
      <Link
        to={`/rentals/${product.slug}`}
        className="relative block w-full aspect-[4/3] bg-slate-100 overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/images/products/chairs/gold-chiavari-chair.jpg';
          }}
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
        />

        {/* Gradient vignette for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* Top Left Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.featured && (
            <span className="text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Popular</span>
            </span>
          )}
          {product.minQuantity && product.minQuantity > 1 && (
            <span className="text-[10px] font-semibold bg-slate-900/80 backdrop-blur-xs text-white px-2 py-0.5 rounded-full shadow-xs">
              Min: {product.minQuantity} pcs
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all duration-200 z-10 ${
            favorite
              ? 'bg-rose-50 text-rose-600 shadow-sm scale-110'
              : 'bg-white/85 backdrop-blur-xs text-slate-700 hover:text-rose-600 hover:bg-white shadow-2xs'
          }`}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-3.5 h-3.5 ${favorite ? 'fill-current' : ''}`} />
        </button>
      </Link>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Hindi Subtitle */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              {product.categoryName}
            </span>
            {product.hindiName && (
              <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">
                {product.hindiName}
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link to={`/rentals/${product.slug}`} className="block">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Tagline / Brief specification */}
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-black text-slate-900">
                {formatPrice(product.rentalPrice)}
              </span>
              <span className="text-[11px] font-medium text-slate-400">
                /{product.pricingUnit.replace('per ', '')}
              </span>
            </div>
            {product.dimensions && (
              <span className="text-[10px] text-slate-400 block -mt-0.5">
                {product.dimensions}
              </span>
            )}
          </div>

          {/* Interactive Stepper or Add Button */}
          {cartItem ? (
            <div className="flex items-center bg-emerald-50 border border-emerald-300 rounded-xl overflow-hidden shadow-2xs">
              <button
                onClick={handleDecrement}
                className="p-1.5 text-emerald-800 hover:bg-emerald-100 active:bg-emerald-200 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-xs font-bold text-emerald-900 min-w-[28px] text-center">
                {cartItem.quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="p-1.5 text-emerald-800 hover:bg-emerald-100 active:bg-emerald-200 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleQuickAdd}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
