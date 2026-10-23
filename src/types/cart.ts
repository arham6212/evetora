import { Product } from './product';

export interface CartItem {
  id: string; // unique composite key: `${productId}-${variantId || 'default'}`
  productId: string;
  product: Product;
  variantId?: string;
  variantName?: string;
  quantity: number;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  rentalDays: number;
  unitPrice: number;
  subtotal: number;
}

export interface CartTotals {
  subtotal: number;
  setupFeeEstimate: number;
  refundableDamageDeposit: number;
  estimatedTotal: number;
  totalQuantity: number;
}
