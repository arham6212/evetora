import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Calendar,
  ClipboardCheck,
  Truck,
  Plus,
  Minus,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { Button } from '../components/ui/Button';

export const HowItWorksPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const steps = [
    {
      number: '01',
      title: 'Choose Your Rental Items',
      icon: <Search className="w-5 h-5 text-emerald-600" />,
      desc: 'Browse our collection of white plastic chairs, banquet seating, shamiana tents, buffet tables, and floodlights based on your expected guest count.',
    },
    {
      number: '02',
      title: 'Select Quantities & Dates',
      icon: <Calendar className="w-5 h-5 text-emerald-600" />,
      desc: 'Use our quick bulk counters (e.g. 50, 100, 200 chairs) and pick your function start and end dates. Approximate rental charges calculate instantly.',
    },
    {
      number: '03',
      title: 'Submit Inquiry or WhatsApp',
      icon: <ClipboardCheck className="w-5 h-5 text-emerald-600" />,
      desc: 'Send your request online or directly via WhatsApp with your venue location. No upfront online payment is required during demonstration.',
    },
    {
      number: '04',
      title: 'Local Tempo Delivery & Setup',
      icon: <Truck className="w-5 h-5 text-emerald-600" />,
      desc: 'The local tent house provider coordinates delivery via commercial tempo, unloads equipment at your venue, and sets up tents if requested.',
    },
  ];

  const faqs = [
    {
      q: 'Can I rent chairs and tables for just one day?',
      a: 'Yes, absolutely. The majority of our rentals are for single-day birthday parties, pujas, and family dinners. Equipment is typically delivered in the morning and picked up late night or the following morning.',
    },
    {
      q: 'How are delivery and transport charges calculated?',
      a: 'Delivery charges depend on the distance between the local equipment warehouse and your event address, as well as vehicle size (e.g. Tata Ace / 3-wheeler tempo for chairs vs. large truck for full shamiana). The exact delivery charge is confirmed directly by the provider before dispatch.',
    },
    {
      q: 'Is tent and shamiana setup included in the price?',
      a: 'Yes! All shamiana tents and pandals include professional erection and dismantling by experienced local tent workers. For loose plastic chairs and tables, basic unloading is included, with optional complete table arrangement available upon request.',
    },
    {
      q: 'What is the payment mode?',
      a: 'Most local rental partners accept UPI (Google Pay, PhonePe, Paytm) or cash on delivery once the tempo arrives at your venue and you verify the item count.',
    },
    {
      q: 'How far in advance should I book for wedding season?',
      a: 'For peak wedding dates (November–February and April–May), we strongly recommend reserving your shamiana and banquet chairs at least 2 to 3 weeks in advance. For small birthday parties and house pujas, 2 to 4 days prior is usually sufficient.',
    },
    {
      q: 'What if items get damaged during the event?',
      a: 'Normal minor wear and tear is fully expected. For broken plastic chairs or burnt linens, nominal replacement costs apply according to the standard local tent house price sheet.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Simple & Hassle-Free</span>
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          How Evento Rentals Work
        </h1>
        <p className="text-xs sm:text-base text-slate-500 max-w-2xl leading-relaxed">
          Affordable, friendly local event equipment rental designed for everyday Indian families and local organizers. No broker hassles or market hunting.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {steps.map((step) => (
          <div
            key={step.number}
            className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-3.5 shadow-2xs hover:shadow-md transition-shadow relative"
          >
            <div className="flex items-center justify-between">
              <span className="w-11 h-11 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center font-bold">
                {step.icon}
              </span>
              <span className="text-2xl font-black text-slate-200">
                {step.number}
              </span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              {step.title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Direct WhatsApp Callout */}
      <div className="p-6 sm:p-8 bg-emerald-50 border border-emerald-200 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Instant Local Help</span>
          </div>
          <h3 className="font-extrabold text-lg sm:text-xl text-emerald-950">
            Have custom requirements or need urgent same-day chairs?
          </h3>
          <p className="text-xs text-emerald-800/90 max-w-xl">
            Send us a quick WhatsApp message with your city, venue area, and approximate guest count. Our coordinator will reply with approximate delivery costs.
          </p>
        </div>
        <a
          href={`https://wa.me/${siteConfig.whatsapp.number.replace(/\D/g, '')}?text=Namaste%20Evento!%20I%20need%20chairs/tent%20rental%20information.`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 shrink-0 shadow-sm transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-1 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Common questions about local delivery, pricing, payment, and bookings.
          </p>
        </div>

        <div className="divide-y divide-slate-100 border border-slate-200/90 rounded-2xl bg-white overflow-hidden shadow-2xs">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="p-4 sm:p-5">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-3 text-sm sm:text-base font-bold text-slate-900 hover:text-emerald-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="p-1.5 bg-slate-100 text-slate-600 rounded-lg shrink-0">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed animate-in fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="text-center space-y-3 pt-4">
        <h3 className="text-lg font-bold text-slate-900">
          Ready to select items for your upcoming event?
        </h3>
        <Link to="/rentals">
          <Button variant="primary" size="lg" className="bg-emerald-600 hover:bg-emerald-700 font-bold shadow-md shadow-emerald-600/20" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
            Browse All Rental Items
          </Button>
        </Link>
      </div>
    </div>
  );
};
