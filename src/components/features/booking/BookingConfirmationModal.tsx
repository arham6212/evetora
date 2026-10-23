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
          colors: ['#059669', '#10B981', '#F59E0B', '#3B82F6'],
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

  const whatsappText = `Namaste! I submitted a rental inquiry on Evento.\nReference Code: *#${inquiry.referenceCode}*\nName: ${inquiry.customerName}\nItems: ${inquiry.totals.totalQuantity} items (${formatPrice(inquiry.totals.estimatedTotal)})\nDates: ${formatDateDisplay(inquiry.eventDate)} to ${formatDateDisplay(inquiry.endDate)}\nAddress: ${inquiry.eventLocation}\nPlease confirm availability.`;
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.number.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="xl">
      <div className="space-y-5 print:m-0">
        {/* Header */}
        <div className="text-center space-y-1.5 pb-4 border-b border-slate-100">
          <div className="w-14 h-14 mx-auto bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <span className="text-xs uppercase tracking-wider text-emerald-700 font-bold block">
            Rental Inquiry Received
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Inquiry Ref #{inquiry.referenceCode}
          </h2>
          <p className="text-xs text-slate-500">
            Thank you, {inquiry.customerName}! Your rental request has been simulated and saved.
          </p>
        </div>

        {/* Demo Notice */}
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Demonstration Mode:</strong> No real payment was charged and no live vehicle was dispatched. In actual service, the local provider in your city would call or WhatsApp you within 2 hours to confirm vehicle dispatch and setup time.
          </div>
        </div>

        {/* Details Card */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
          <div className="flex items-start gap-2 text-slate-800">
            <Calendar className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-slate-900">Event Dates:</strong>{' '}
              {formatDateDisplay(inquiry.eventDate)} → {formatDateDisplay(inquiry.endDate)} ({inquiry.eventType.toUpperCase()})
            </div>
          </div>
          <div className="flex items-start gap-2 text-slate-800">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-slate-900">Delivery Venue:</strong> {inquiry.eventLocation}
            </div>
          </div>
        </div>

        {/* Items Summary */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-700 block">
            Requested Items ({inquiry.totals.totalQuantity}):
          </span>
          <div className="border border-slate-200 divide-y divide-slate-100 rounded-2xl max-h-40 overflow-y-auto">
            {inquiry.items.map((item) => (
              <div key={item.id} className="p-2.5 text-xs flex justify-between items-center bg-white">
                <div className="flex items-center gap-2">
                  <Package className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-slate-800">
                    <strong className="font-bold text-slate-900">{item.quantity}x</strong> {item.product.name}
                  </span>
                </div>
                <span className="font-bold text-slate-900">{formatPrice(item.subtotal)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Estimated Amount */}
        <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex justify-between items-center">
          <span className="text-xs font-bold text-emerald-900">Estimated Rental Total:</span>
          <span className="text-2xl font-black text-emerald-700">
            {formatPrice(inquiry.totals.estimatedTotal)}
          </span>
        </div>

        {/* Actions */}
        <div className="space-y-2.5 pt-1 print:hidden">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4 text-slate-950" />
            <span>Send Details to Provider on WhatsApp</span>
          </a>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handlePrint}
              className="py-2.5 px-3 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / Save</span>
            </button>
            <button
              onClick={onClose}
              className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
            >
              Done & Return
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
