import { CartItem } from '../types/cart';
import { siteConfig } from '../data/siteConfig';
import { formatDateDisplay, formatPrice } from './formatters';

export interface WhatsAppInquiryData {
  items: CartItem[];
  city: string;
  pincode?: string;
  startDate?: string;
  endDate?: string;
  customerName?: string;
  eventType?: string;
}

export const generateWhatsAppLink = (data: WhatsAppInquiryData): string => {
  const cleanNumber = siteConfig.whatsapp.number.replace(/\D/g, '');

  let text = `Namaste Eventora! 🙏\nI want to inquire about renting equipment for an event:`;

  if (data.eventType) {
    text += `\n*Event:* ${data.eventType.toUpperCase()}`;
  }

  if (data.city) {
    text += `\n*Location:* ${data.city} ${data.pincode ? `(${data.pincode})` : ''}`;
  }

  if (data.startDate && data.endDate) {
    text += `\n*Dates:* ${formatDateDisplay(data.startDate)} to ${formatDateDisplay(data.endDate)}`;
  }

  if (data.items.length > 0) {
    text += `\n\n*Selected Items:*`;
    data.items.forEach((item, idx) => {
      text += `\n${idx + 1}. ${item.quantity}x ${item.product.name} ${
        item.variantName ? `(${item.variantName})` : ''
      } - ${formatPrice(item.subtotal)}`;
    });

    const totalEstimate = data.items.reduce((sum, item) => sum + item.subtotal, 0);
    text += `\n\n*Estimated Rental:* ${formatPrice(totalEstimate)}`;
  }

  text += `\n\nPlease check availability and share delivery charges. Thank you!`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
};
