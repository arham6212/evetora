import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Calendar, MapPin, Package, Download, AlertCircle, MessageCircle } from 'lucide-react';
import { Modal } from '../../ui/Modal';
import { BookingInquiry } from '../../../types/booking';
import { formatPrice, formatDateDisplay } from '../../../utils/formatters';
import { siteConfig } from '../../../data/siteConfig';

export interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiry: BookingInquiry | null;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  isOpen,
  onClose,
  inquiry,
}) => {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#0F766E', '#EA580C', '#F59E0B', '#16A34A'],
        });
      } catch {
        // fallback
      }
    }
  }, [isOpen]);

  if (!isOpen || !inquiry) return null;

  const handlePrint = () => {
    window.print();
  };

  const whatsappText = `Namaste! I submitted a rental inquiry on Eventora.\nReference Code: *#${inquiry.referenceCode}*\nName: ${inquiry.customerName}\nItems: ${inquiry.totals.totalQuantity} items (${formatPrice(inquiry.totals.estimatedTotal)})\nDates: ${formatDateDisplay(inquiry.eventDate)} to ${formatDateDisplay(inquiry.endDate)}\nAddress: ${inquiry.eventLocation}\nPlease confirm availability.`;
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.number.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="xl">
      <div className="space-y-5 print:m-0">
        {/* Header */}
        <div className="text-center space-y-1.5 pb-3 border-b border-brand-sand">
          <div className="w-12 h-12 mx-auto bg-green-100 text-green-700 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-wider text-green-700 font-bold block">
            Rental Inquiry Received
          </span>
          <h2 className="text-2xl font-bold text-brand-charcoal">
            Inquiry Ref #{inquiry.referenceCode}
          </h2>
          <p className="text-xs text-brand-charcoal/70">
            Thank you, {inquiry.customerName}! Your rental request has been simulated and saved.
          </p>
        </div>

        {/* Demo Notice */}
        <div className="p-3 bg-brand-yellow-soft border border-amber-300 rounded-md text-xs text-amber-900 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
          <div>
            <strong>Demonstration Mode:</strong> No real payment was charged and no live booking was dispatched. In production, the local provider in your city would call or WhatsApp you within 2 hours to confirm vehicle dispatch.
          </div>
        </div>

        {/* Details Card */}
        <div className="p-3.5 bg-brand-sand-light rounded-md border border-brand-sand text-xs space-y-2">
          <div className="flex items-start gap-2 text-brand-charcoal">
            <Calendar className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
            <div>
              <strong>Event Dates:</strong>{' '}
              {formatDateDisplay(inquiry.eventDate)} → {formatDateDisplay(inquiry.endDate)} ({inquiry.eventType.toUpperCase()})
            </div>
          </div>
          <div className="flex items-start gap-2 text-brand-charcoal">
            <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
            <div>
              <strong>Delivery Venue:</strong> {inquiry.eventLocation}
            </div>
          </div>
        </div>

        {/* Items Summary */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-brand-charcoal block">
            Requested Items ({inquiry.totals.totalQuantity}):
          </span>
          <div className="border border-brand-sand divide-y divide-brand-sand rounded-md max-h-40 overflow-y-auto">
            {inquiry.items.map((item) => (
              <div key={item.id} className="p-2 text-xs flex justify-between items-center bg-white">
                <div className="flex items-center gap-2">
                  <Package className="w-3.5 h-3.5 text-brand-primary" />
                  <span>
                    <strong>{item.quantity}x</strong> {item.product.name}
                  </span>
                </div>
                <span className="font-bold text-brand-charcoal">{formatPrice(item.subtotal)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Estimated Amount */}
        <div className="p-3 bg-brand-primary-soft border border-brand-primary/30 rounded-md flex justify-between items-center">
          <span className="text-xs font-bold text-brand-primary">Estimated Rental Total:</span>
          <span className="text-xl font-bold text-brand-primary">
            {formatPrice(inquiry.totals.estimatedTotal)}
          </span>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-1 print:hidden">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-md flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send Details to Provider on WhatsApp</span>
          </a>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handlePrint}
              className="py-2 px-3 border border-brand-sand hover:bg-brand-sand-light text-brand-charcoal text-xs font-semibold rounded-md flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / Save</span>
            </button>
            <button
              onClick={onClose}
              className="py-2 px-3 bg-brand-primary text-white text-xs font-bold rounded-md hover:bg-brand-primary-dark"
            >
              Done & Return
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
