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
              <span className="font-semibold text-slate-600">Estimated Subtotal:</span>
              <span className="text-xl font-black text-slate-900">
                {formatPrice(totals.estimatedTotal)}
              </span>
            </div>

            <div className="space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeCart}
                className="w-full py-3 px-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs sm:text-sm font-black rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-slate-950" />
                <span>Inquire on WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/cart"
                  onClick={closeCart}
                  className="py-2.5 px-3 border border-slate-200 hover:bg-slate-50 text-slate-800 text-center text-xs font-bold rounded-xl transition-colors"
                >
                  View Details
                </Link>
                <button
                  onClick={() => {
                    closeCart();
                    onProceedToInquiry();
                  }}
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-center text-xs font-bold rounded-xl transition-colors shadow-xs"
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
        <div className="py-14 text-center space-y-3">
          <div className="w-14 h-14 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h4 className="text-base font-bold text-slate-900">
            Your rental selection is empty
          </h4>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            Choose plastic chairs, tables, shamiana tents, and sound systems for your upcoming event in {city}.
          </p>
          <div className="pt-2">
            <Link
              to="/rentals"
              onClick={closeCart}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 shadow-sm transition-colors"
            >
              <span>Browse Items</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-3 divide-y divide-slate-100">
          {items.map((item) => (
            <div key={item.id} className="pt-3.5 first:pt-0 flex gap-3.5 items-start">
              <Link
                to={`/rentals/${item.product.slug}`}
                onClick={closeCart}
                className="w-18 h-18 bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-200"
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

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex justify-between items-start gap-1">
                  <Link
                    to={`/rentals/${item.product.slug}`}
                    onClick={closeCart}
                    className="text-xs sm:text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors line-clamp-1"
                  >
                    {item.product.name}
                  </Link>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-slate-400 hover:text-rose-600 p-0.5 rounded transition-colors"
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Calendar className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>
                    {formatDateDisplay(item.startDate)} ({item.rentalDays}d)
                  </span>
                </div>

                <div className="pt-1.5 flex items-center justify-between">
                  <QuantitySelector
                    value={item.quantity}
                    onChange={(newQty) => updateQuantity(item.id, newQty)}
                    size="sm"
                    min={item.product.minQuantity || 1}
                  />
                  <div className="text-right">
                    <span className="text-xs font-black text-slate-900 block">
                      {formatPrice(item.subtotal)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
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
