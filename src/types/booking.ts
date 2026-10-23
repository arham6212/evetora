import { CartItem, CartTotals } from './cart';

export interface BookingInquiry {
  referenceCode: string;
  customerName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  endDate: string;
  eventLocation: string;
  deliveryMethod: 'white-glove-delivery' | 'self-collection';
  setupRequested: boolean;
  notes?: string;
  items: CartItem[];
  totals: CartTotals;
  createdAt: string;
  status: 'Received (Demo)' | 'Quote In Review';
}
