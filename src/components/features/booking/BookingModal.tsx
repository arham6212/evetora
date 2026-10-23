import React, { useState } from 'react';
import { Modal } from '../../ui/Modal';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Button } from '../../ui/Button';
import { DateRangePicker } from '../../ui/DateRangePicker';
import { useCart } from '../../../context/CartContext';
import { useLocationContext } from '../../../context/LocationContext';
import { BookingInquiry } from '../../../types/booking';
import { formatPrice } from '../../../utils/formatters';
import { generateWhatsAppLink } from '../../../utils/whatsapp';
import { MessageCircle } from 'lucide-react';

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (inquiry: BookingInquiry) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { items, totals, clearCart } = useCart();
  const { city, pincode } = useLocationContext();

  const defaultStart = items[0]?.startDate || new Date().toISOString().split('T')[0];
  const defaultEnd = items[0]?.endDate || new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    city: city,
    pincode: pincode,
    venueAddress: '',
    eventType: 'wedding',
    startDate: defaultStart,
    endDate: defaultEnd,
    deliveryMethod: 'white-glove-delivery' as 'white-glove-delivery' | 'self-collection',
    setupRequested: true,
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const eventTypeOptions = [
    { value: 'wedding', label: 'Wedding & Haldi (शादी व हल्दी)' },
    { value: 'birthday', label: 'Birthday Party (जन्मदिन समारोह)' },
    { value: 'puja', label: 'Puja & Jagran (पूजा व जागरण)' },
    { value: 'engagement', label: 'Engagement / Roka (सगाई / रोका)' },
    { value: 'family', label: 'Family Gathering (पारिवारिक मिलन)' },
    { value: 'school', label: 'School / College Event (वार्षिक उत्सव)' },
    { value: 'shop', label: 'Shop Opening (दुकान उद्घाटन)' },
    { value: 'community', label: 'Community Function (सोसाइटी सभा)' },
  ];

  const deliveryOptions = [
    { value: 'white-glove-delivery', label: 'Tempo Delivery to Venue (टेंपो डिलीवरी)' },
    { value: 'self-collection', label: 'Self Pick-up from Local Warehouse (खुद पिकअप)' },
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Please enter your full name';
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.venueAddress.trim()) {
      newErrors.venueAddress = 'Please enter house/venue address or colony';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const randomCode = `EVT-${Math.floor(10000 + Math.random() * 90000)}`;
      const inquiry: BookingInquiry = {
        referenceCode: randomCode,
        customerName: formData.customerName,
        email: formData.email || `${formData.phone}@eventora-demo.in`,
        phone: formData.phone,
        eventType: formData.eventType,
        eventDate: formData.startDate,
        endDate: formData.endDate,
        eventLocation: `${formData.venueAddress}, ${formData.city} (${formData.pincode})`,
        deliveryMethod: formData.deliveryMethod,
        setupRequested: formData.setupRequested,
        notes: formData.notes,
        items: [...items],
        totals: { ...totals },
        createdAt: new Date().toISOString(),
        status: 'Received (Demo)',
      };

      setIsSubmitting(false);
      clearCart();
      onClose();
      onSuccess(inquiry);
    }, 600);
  };

  const whatsappUrl = generateWhatsAppLink({
    items,
    city: formData.city,
    pincode: formData.pincode,
    startDate: formData.startDate,
    endDate: formData.endDate,
    eventType: formData.eventType,
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Request Rental Quote"
      subtitle={`Local Rental Inquiry • ${city}`}
      maxWidth="xl"
    >
      <div className="space-y-5">
        {/* Quick WhatsApp option banner */}
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-green-900 font-medium">
            <MessageCircle className="w-5 h-5 text-green-600 shrink-0" />
            <span>Prefer WhatsApp? Send your inquiry directly with 1 click:</span>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded font-bold shrink-0 shadow-xs"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* Regular Submission Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Input
              label="Your Full Name"
              required
              placeholder="e.g. Rajesh Sharma"
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
              error={errors.customerName}
            />

            <Input
              label="Mobile Number"
              type="tel"
              required
              placeholder="e.g. 98765 43210"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value.replace(/[^\d\s-]/g, ''),
                })
              }
              error={errors.phone}
              helperText="Provider will call you to confirm delivery."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Select
              label="Event Occasion"
              options={eventTypeOptions}
              value={formData.eventType}
              onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
            />

            <Select
              label="Delivery Preference"
              options={deliveryOptions}
              value={formData.deliveryMethod}
              onChange={(e) =>
                setFormData({ ...formData, deliveryMethod: e.target.value as any })
              }
            />
          </div>

          <DateRangePicker
            startDate={formData.startDate}
            endDate={formData.endDate}
            onChange={(dates) =>
              setFormData({ ...formData, startDate: dates.start, endDate: dates.end })
            }
            label="Event Date Range"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="sm:col-span-2">
              <Input
                label="Venue Address / Colony / Landmark"
                required
                placeholder="e.g. Plot 14, Aliganj Main Road, near SBI"
                value={formData.venueAddress}
                onChange={(e) =>
                  setFormData({ ...formData, venueAddress: e.target.value })
                }
                error={errors.venueAddress}
              />
            </div>
            <div>
              <Input
                label="PIN Code"
                placeholder="e.g. 226001"
                maxLength={6}
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              />
            </div>
          </div>

          {/* Setup Service Checkbox */}
          <div className="p-3 bg-brand-sand-light border border-brand-sand rounded-md flex items-start gap-2.5">
            <input
              type="checkbox"
              id="setupRequested"
              checked={formData.setupRequested}
              onChange={(e) =>
                setFormData({ ...formData, setupRequested: e.target.checked })
              }
              className="mt-0.5 w-4 h-4 text-brand-primary rounded"
            />
            <label htmlFor="setupRequested" className="text-xs text-brand-charcoal cursor-pointer">
              <strong className="block font-semibold">Include Tent & Chair Setup Assistance</strong>
              <span className="text-brand-taupe">
                Local crew will unload chairs, set up shamiana tent, and arrange dining tables.
              </span>
            </label>
          </div>

          {/* Special Notes */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-charcoal/80 block">
              Any Special Instructions? (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Delivery needed by 11:00 AM on event day; second floor staircase..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-brand-sand rounded-md text-brand-charcoal focus:outline-none focus:border-brand-primary"
            />
          </div>

          {/* Submit Actions */}
          <div className="pt-3 border-t border-brand-sand flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-brand-charcoal/80">
              <span className="font-bold text-brand-charcoal text-sm block">
                Estimated Total: {formatPrice(totals.estimatedTotal)}
              </span>
              <span className="text-[10px] text-brand-taupe">
                ({totals.totalQuantity} items • delivery confirmed by provider)
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isSubmitting || items.length === 0}
                className="bg-brand-primary hover:bg-brand-primary-dark font-bold"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Rental Inquiry'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};
