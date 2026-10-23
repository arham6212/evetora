import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Calendar, ArrowRight, ShoppingBag, ArrowLeft, MapPin, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLocationContext } from '../context/LocationContext';
import { formatPrice, formatDateDisplay } from '../utils/formatters';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { CartSummary } from '../components/features/cart/CartSummary';
import { Button } from '../components/ui/Button';

interface CartPageProps {
  onOpenBooking: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onOpenBooking }) => {
  const { items, totals, updateQuantity, removeItem, clearCart } = useCart();
  const { city, pincode, openLocationModal } = useLocationContext();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Rental Cart</span>
            </span>
            <button
              onClick={openLocationModal}
              className="text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold transition-colors"
            >
              <MapPin className="w-3 h-3 text-emerald-600" />
              <span>{city} ({pincode})</span>
              <span className="text-[10px] text-emerald-600 underline ml-0.5">Change</span>
            </button>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Selected Items ({totals.totalQuantity} items)
          </h1>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-slate-400 hover:text-rose-600 font-bold self-start sm:self-auto transition-colors"
          >
            Clear All Items
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-16 text-center bg-white border border-slate-200/90 rounded-3xl p-8 space-y-4 shadow-2xs">
          <div className="w-16 h-16 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            Your rental selection is empty
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            Add plastic chairs, buffet tables, shamiana pandals, and lighting for your celebration in {city}.
          </p>
          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/rentals')}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="font-bold bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20"
            >
              Browse Rental Items
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="border border-slate-200/90 rounded-3xl overflow-hidden bg-white divide-y divide-slate-100 shadow-2xs">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:bg-slate-50/50 transition-colors"
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex gap-4 items-center">
                    <Link
                      to={`/rentals/${item.product.slug}`}
                      className="w-20 h-20 sm:w-22 sm:h-22 bg-slate-100 rounded-2xl overflow-hidden shrink-0 border border-slate-200"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        onError={(e) => {
                          e.currentTarget.src = '/images/products/chairs/gold-chiavari-chair.jpg';
                        }}
                        className="w-full h-full object-cover object-center"
                      />
                    </Link>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                        {item.product.categoryName}
                      </span>
                      <Link
                        to={`/rentals/${item.product.slug}`}
                        className="text-base sm:text-lg font-black text-slate-900 hover:text-emerald-600 transition-colors block line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      {item.variantName && (
                        <span className="text-xs text-slate-500 block">
                          Color / Style: <strong className="text-slate-800">{item.variantName}</strong>
                        </span>
                      )}
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>
                          {formatDateDisplay(item.startDate)} → {formatDateDisplay(item.endDate)}{' '}
                          <span className="text-slate-400 font-semibold">({item.rentalDays} {item.rentalDays === 1 ? 'day' : 'days'})</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Stepper, Price & Remove */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="text-left sm:text-right">
                      <span className="text-lg sm:text-xl font-black text-slate-900 block">
                        {formatPrice(item.subtotal)}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {formatPrice(item.unitPrice)} / {item.product.pricingUnit.replace('per ', '')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <QuantitySelector
                        value={item.quantity}
                        onChange={(newQty) => updateQuantity(item.id, newQty)}
                        size="sm"
                        min={item.product.minQuantity || 1}
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/rentals"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Add More Equipment</span>
              </Link>
            </div>
          </div>

          {/* Right Col: Summary & Checkout (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-4">
              <CartSummary
                totals={totals}
                items={items}
                showInquiryButton={true}
                onProceedToInquiry={onOpenBooking}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
