import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
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
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Customer Support & Inquiries</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            Serving {city}
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Contact Our Local Rental Desk
        </h1>
        <p className="text-xs sm:text-base text-slate-500 max-w-2xl leading-relaxed">
          Need advice on how many chairs or tables you need, or have questions about delivery to your venue in {city}? We are here to help you plan smoothly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Information & WhatsApp (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* WhatsApp Card */}
          <div className="p-6 sm:p-7 bg-emerald-600 text-white rounded-3xl space-y-4 shadow-lg shadow-emerald-600/20">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full inline-block">
              Fastest Response
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Chat Directly on WhatsApp
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Send your event date, item list, and venue area. Our local coordinator will reply with approximate delivery costs and stock availability in {city}.
            </p>
            <a
              href={`https://wa.me/${siteConfig.whatsapp.number.replace(/\D/g, '')}?text=Namaste%20Evento!%20I%20have%20an%20inquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-white hover:bg-slate-50 text-emerald-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-98"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Open WhatsApp Chat</span>
            </a>
          </div>

          {/* Details Card */}
          <div className="p-6 bg-white border border-slate-200/90 rounded-3xl space-y-4 shadow-2xs text-xs text-slate-600">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100">
              Helpline & Operational Hours
            </h3>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-slate-900 font-bold text-xs">Phone Helpline:</strong>
                <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, '')}`} className="text-emerald-700 font-black text-sm hover:underline">
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-slate-900 font-bold text-xs">Operational Hours:</strong>
                <span className="text-slate-600">{siteConfig.contact.hours}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-slate-900 font-bold text-xs">Local Service Hub:</strong>
                <span className="text-slate-600">{siteConfig.contact.address}, {city}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-slate-900 font-bold text-xs">Customer Email:</strong>
                <span className="text-slate-600">{siteConfig.contact.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl shadow-2xs">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 mx-auto bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                Message Sent Successfully
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                Thank you! Your inquiry simulation has been recorded. Our local {city} coordinator will contact you shortly.
              </p>
              <div className="pt-2">
                <Button variant="secondary" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  Send an Online Message
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  We typically respond within 1 to 2 hours during operational hours.
                </p>
              </div>

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
                  placeholder={`e.g. ${city}, Aliganj`}
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

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  How can we help? (Tell us about chairs, tables, or shamiana required)
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="e.g. Need 100 plastic chairs and 4 buffet tables for birthday party on Saturday evening..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 transition-colors shadow-2xs"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                className="bg-emerald-600 hover:bg-emerald-700 font-bold text-xs sm:text-sm py-3 rounded-xl shadow-md shadow-emerald-600/20"
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
