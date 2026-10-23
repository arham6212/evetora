import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle2, MessageCircle } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useLocationContext } from '../context/LocationContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const ContactPage: React.FC = () => {
  const { city } = useLocationContext();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: city,
    date: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      <div className="max-w-2xl space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-primary block">
          Customer Support & Inquiries
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-charcoal">
          Contact Our Local Rental Desk
        </h1>
        <p className="text-xs sm:text-sm text-brand-charcoal/70 leading-relaxed">
          Need advice on how many chairs or tables you need, or have questions about delivery to your venue? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Information & WhatsApp */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 bg-brand-primary text-white rounded-xl space-y-4 shadow-subtle">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full inline-block">
              Fastest Response
            </span>
            <h3 className="text-xl font-bold">
              Chat Directly on WhatsApp
            </h3>
            <p className="text-xs text-white/90 leading-relaxed">
              Send your event date, item list, and venue area. Our local coordinator will reply with approximate delivery costs and availability.
            </p>
            <a
              href={`https://wa.me/${siteConfig.whatsapp.number.replace(/\D/g, '')}?text=Namaste%20Eventora!%20I%20have%20an%20inquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-md transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Open WhatsApp Chat</span>
            </a>
          </div>

          <div className="p-6 bg-white border border-brand-sand rounded-xl space-y-4 shadow-subtle text-xs text-brand-charcoal/80">
            <h3 className="text-sm font-bold text-brand-charcoal uppercase tracking-wider pb-2 border-b border-brand-sand">
              Helpline & Hours
            </h3>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
              <div>
                <strong className="block text-brand-charcoal font-semibold">Phone Helpline:</strong>
                <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, '')}`} className="text-brand-primary font-bold">
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
              <div>
                <strong className="block text-brand-charcoal font-semibold">Timing:</strong>
                <span>{siteConfig.contact.hours}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
              <div>
                <strong className="block text-brand-charcoal font-semibold">Service Hub:</strong>
                <span>{siteConfig.contact.address}, {city}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
              <div>
                <strong className="block text-brand-charcoal font-semibold">Email:</strong>
                <span>{siteConfig.contact.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white border border-brand-sand p-6 sm:p-8 rounded-xl shadow-subtle">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-charcoal">
                Message Sent Successfully
              </h3>
              <p className="text-xs text-brand-charcoal/70 max-w-sm mx-auto">
                Thank you! Your inquiry simulation has been recorded. Our coordinator will contact you shortly.
              </p>
              <Button variant="secondary" onClick={() => setSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-bold text-brand-charcoal mb-3">
                Send an Online Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Input
                  label="Your Full Name"
                  required
                  placeholder="e.g. Amit Verma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Input
                  label="Mobile Number"
                  type="tel"
                  required
                  placeholder="e.g. 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Input
                  label="Event City / Area"
                  required
                  placeholder="e.g. Lucknow, Gomti Nagar"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
                <Input
                  label="Event Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-charcoal/80 block">
                  How can we help? (Tell us about chairs, tables, or shamiana required)
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Need 100 plastic chairs and 4 buffet tables for birthday party on Saturday evening..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-brand-sand rounded-md text-brand-charcoal focus:outline-none focus:border-brand-primary"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                className="bg-brand-primary hover:bg-brand-primary-dark font-bold text-xs sm:text-sm"
              >
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
