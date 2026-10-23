import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Calendar, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { Drawer } from '../../ui/Drawer';
import { QuantitySelector } from '../../ui/QuantitySelector';
import { useCart } from '../../../context/CartContext';
import { useLocationContext } from '../../../context/LocationContext';
import { formatPrice, formatDateDisplay } from '../../../utils/formatters';
import { generateWhatsAppLink } from '../../../utils/whatsapp';

export interface CartDrawerProps {
  onProceedToInquiry: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToInquiry }) => {
  const { items, totals, isOpen, closeCart, updateQuantity, removeItem } = useCart();
  const { city, pincode } = useLocationContext();

  const whatsappUrl = generateWhatsAppLink({
    items,
    city,
    pincode,
  });

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeCart}
      title="Rental Cart"
      subtitle={`${totals.totalQuantity} items selected • ${city}`}
      footer={
        items.length > 0 ? (
          <div className="space-y-3">
            <div className="flex justify-between items-baseline text-sm">
              <span className="font-semibold text-brand-charcoal">Estimated Subtotal:</span>
              <span className="text-lg font-bold text-brand-charcoal">
                {formatPrice(totals.estimatedTotal)}
              </span>
            </div>

            <div className="space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeCart}
                className="w-full py-2.5 px-3 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/cart"
                  onClick={closeCart}
                  className="py-2 px-3 border border-brand-sand hover:bg-brand-sand-light text-brand-charcoal text-center text-xs font-semibold rounded-md transition-colors"
                >
                  View Details
                </Link>
                <button
                  onClick={() => {
                    closeCart();
                    onProceedToInquiry();
                  }}
                  className="py-2 px-3 bg-brand-primary text-white text-center text-xs font-semibold rounded-md hover:bg-brand-primary-dark transition-colors"
                >
                  Submit Form
                </button>
              </div>
            </div>
          </div>
        ) : null
      }
    >
      {items.length === 0 ? (
        <div className="py-12 text-center space-y-3">
          <div className="w-12 h-12 mx-auto bg-brand-sand-light rounded-full flex items-center justify-center text-brand-taupe">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-brand-charcoal">
            Your rental selection is empty
          </h4>
          <p className="text-xs text-brand-charcoal/70 max-w-xs mx-auto">
            Choose plastic chairs, tables, shamiana tents, and sound systems for your upcoming event.
          </p>
          <Link
            to="/rentals"
            onClick={closeCart}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-primary text-white text-xs font-bold rounded-md hover:bg-brand-primary-dark transition-colors"
          >
            <span>Browse Items</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="space-y-3 divide-y divide-brand-sand/60">
          {items.map((item) => (
            <div key={item.id} className="pt-3 first:pt-0 flex gap-3 items-start">
              <Link
                to={`/rentals/${item.product.slug}`}
                onClick={closeCart}
                className="w-16 h-16 bg-brand-sand-light rounded-md overflow-hidden shrink-0 border border-brand-sand"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover object-center"
                />
              </Link>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex justify-between items-start gap-1">
                  <Link
                    to={`/rentals/${item.product.slug}`}
                    onClick={closeCart}
                    className="text-xs sm:text-sm font-bold text-brand-charcoal hover:text-brand-primary transition-colors line-clamp-1"
                  >
                    {item.product.name}
                  </Link>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-brand-taupe hover:text-red-600 p-0.5"
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-brand-charcoal/70">
                  <Calendar className="w-3 h-3 text-brand-primary shrink-0" />
                  <span>
                    {formatDateDisplay(item.startDate)} ({item.rentalDays}d)
                  </span>
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <QuantitySelector
                    value={item.quantity}
                    onChange={(newQty) => updateQuantity(item.id, newQty)}
                    size="sm"
                    min={item.product.minQuantity || 1}
                  />
                  <div className="text-right">
                    <span className="text-xs font-bold text-brand-charcoal block">
                      {formatPrice(item.subtotal)}
                    </span>
                    <span className="text-[10px] text-brand-taupe">
                      {formatPrice(item.unitPrice)}/{item.product.pricingUnit.replace('per ', '')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
};
