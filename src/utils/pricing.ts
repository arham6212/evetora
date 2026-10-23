import { PricingUnit } from '../types/product';
import { CartItem, CartTotals } from '../types/cart';

export const calculateItemSubtotal = (
  unitPrice: number,
  quantity: number,
  rentalDays: number,
  pricingUnit: PricingUnit
): number => {
  if (pricingUnit === 'per event') {
    return Math.round(unitPrice * quantity);
  }
  // Daily compounding units
  const days = Math.max(1, rentalDays);
  return Math.round(unitPrice * quantity * days);
};

export const calculateCartTotals = (items: CartItem[]): CartTotals => {
  const subtotal = items.reduce((acc, item) => acc + item.subtotal, 0);
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  // For local Indian small-business rentals, no automatic surprise deposit is forced;
  // Delivery & setup is calculated/confirmed upon location inspection.
  return {
    subtotal: Math.round(subtotal),
    setupFeeEstimate: 0,
    refundableDamageDeposit: 0,
    estimatedTotal: Math.round(subtotal),
    totalQuantity,
  };
};
