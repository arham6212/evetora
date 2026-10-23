import React from 'react';
import { formatPrice } from '../../../utils/formatters';
import { CartTotals, CartItem } from '../../../types/cart';
import { useLocationContext } from '../../../context/LocationContext';
import { generateWhatsAppLink } from '../../../utils/whatsapp';
import { Info, MessageCircle, Truck } from 'lucide-react';

export interface CartSummaryProps {
  totals: CartTotals;
  items?: CartItem[];
  showInquiryButton?: boolean;
  onProceedToInquiry?: () => void;
  disabled?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  totals,
  items = [],
  showInquiryButton = true,
  onProceedToInquiry,
  disabled = false,
}) => {
  const { city, pincode } = useLocationContext();

  const whatsappUrl = generateWhatsAppLink({
    items,
    city,
    pincode,
  });

  return (
    <div className="bg-white border border-brand-sand rounded-lg p-4 sm:p-5 space-y-4 shadow-subtle">
      <h3 className="text-base font-bold text-brand-charcoal pb-2 border-b border-brand-sand flex items-center justify-between">
        <span>Estimated Rental Bill</span>
        <span className="text-xs font-normal text-brand-taupe">({totals.totalQuantity} items)</span>
      </h3>

      <div className="space-y-2 text-xs text-brand-charcoal/80">
        <div className="flex justify-between items-center">
          <span className="text-brand-charcoal/70">Equipment Subtotal:</span>
          <span className="font-bold text-brand-charcoal text-sm">
            {formatPrice(totals.subtotal)}
          </span>
        </div>

        <div className="flex justify-between items-start text-brand-charcoal/70 pt-1">
          <div className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-brand-primary" />
            <span>Local Tempo Delivery:</span>
          </div>
          <span className="text-[11px] font-semibold text-brand-primary">
            Confirmed in Quote
          </span>
        </div>

        <div className="pt-3 border-t border-brand-sand flex justify-between items-baseline">
          <div>
            <span className="text-sm font-bold text-brand-charcoal block">
              Estimated Total
            </span>
            <span className="text-[10px] text-brand-taupe">
              Delivering to {city} ({pincode})
            </span>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-brand-charcoal">
            {formatPrice(totals.estimatedTotal)}
          </span>
        </div>
      </div>

      <div className="p-2.5 bg-brand-primary-soft border border-brand-primary/20 rounded-md text-[11px] text-brand-charcoal/80 flex items-start gap-2">
        <Info className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" />
        <span>
          Final price depends on event duration and tempo delivery distance. Provider will verify stock availability.
        </span>
      </div>

      <div className="space-y-2 pt-1">
        {/* WhatsApp Direct Order Button */}
        {items.length > 0 && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-bold rounded-md flex items-center justify-center gap-2 shadow-subtle transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send Order on WhatsApp</span>
          </a>
        )}

        {/* Regular Inquiry Request */}
        {showInquiryButton && (
          <button
            onClick={onProceedToInquiry}
            disabled={disabled || totals.totalQuantity === 0}
            className="w-full py-2.5 px-4 bg-brand-primary hover:bg-brand-primary-dark text-white text-xs sm:text-sm font-bold rounded-md disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Submit Rental Request Form
          </button>
        )}
      </div>
    </div>
  );
};
