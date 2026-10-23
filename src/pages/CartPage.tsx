import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Calendar, ArrowRight, ShoppingBag, ArrowLeft, MapPin } from 'lucide-react';
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-brand-sand">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
              Your Rental Selection
            </span>
            <button
              onClick={openLocationModal}
              className="text-xs text-brand-charcoal bg-brand-sand-light hover:bg-brand-sand px-2 py-0.5 rounded flex items-center gap-1 font-medium"
            >
              <MapPin className="w-3 h-3 text-brand-primary" />
              <span>{city} ({pincode})</span>
              <span className="text-[10px] text-brand-primary underline ml-0.5">Change</span>
            </button>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-charcoal">
            Event Rental Cart ({totals.totalQuantity} items)
          </h1>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-brand-taupe hover:text-red-600 font-semibold"
          >
            Clear All Items
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-16 text-center bg-white border border-brand-sand rounded-lg p-6 space-y-4 shadow-subtle">
          <div className="w-14 h-14 mx-auto bg-brand-sand-light rounded-full flex items-center justify-center text-brand-taupe">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-brand-charcoal">
            Your rental selection is empty
          </h2>
          <p className="text-xs text-brand-charcoal/70 max-w-sm mx-auto">
            Add plastic chairs, buffet tables, shamiana pandals, and lighting for your celebration.
          </p>
          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/rentals')}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="font-bold bg-brand-primary"
            >
              Browse Rental Items
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="border border-brand-sand rounded-lg overflow-hidden bg-white divide-y divide-brand-sand">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex gap-3.5 items-center">
                    <Link
                      to={`/rentals/${item.product.slug}`}
                      className="w-18 h-18 sm:w-20 sm:h-20 bg-brand-sand-light rounded-md overflow-hidden shrink-0 border border-brand-sand"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </Link>

                    <div className="space-y-0.5">
                      <span className="text-[10px] font-semibold text-brand-primary uppercase">
                        {item.product.categoryName}
                      </span>
                      <Link
                        to={`/rentals/${item.product.slug}`}
                        className="text-sm sm:text-base font-bold text-brand-charcoal hover:text-brand-primary transition-colors block"
                      >
                        {item.product.name}
                      </Link>
                      {item.variantName && (
                        <span className="text-xs text-brand-taupe block">
                          Color: <strong>{item.variantName}</strong>
                        </span>
                      )}
                      <div className="flex items-center gap-1.5 text-xs text-brand-charcoal/70 pt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                        <span>
                          {formatDateDisplay(item.startDate)} → {formatDateDisplay(item.endDate)}{' '}
                          <span className="text-brand-taupe">({item.rentalDays} days)</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Stepper, Price & Remove */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-brand-sand/60">
                    <div className="text-left sm:text-right">
                      <span className="text-base sm:text-lg font-bold text-brand-charcoal block">
                        {formatPrice(item.subtotal)}
                      </span>
                      <span className="text-[11px] text-brand-taupe">
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
                        className="p-1 text-brand-taupe hover:text-red-600 transition-colors"
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
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Add More Items</span>
              </Link>
            </div>
          </div>

          {/* Right Col: Summary & Checkout (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
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
