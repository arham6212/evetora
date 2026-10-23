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
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { Button } from '../components/ui/Button';

export const HowItWorksPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const steps = [
    {
      number: '1',
      title: 'Choose Your Rental Items',
      icon: <Search className="w-5 h-5 text-brand-primary" />,
      desc: 'Browse our collection of white plastic chairs, banquet seating, shamiana tents, buffet tables, and floodlights based on your expected guest count.',
    },
    {
      number: '2',
      title: 'Select Quantities & Dates',
      icon: <Calendar className="w-5 h-5 text-brand-primary" />,
      desc: 'Use our quick bulk counters (e.g. 50, 100, 200 chairs) and pick your function start and end dates. Approximate rental charges calculate instantly.',
    },
    {
      number: '3',
      title: 'Submit Inquiry or WhatsApp',
      icon: <ClipboardCheck className="w-5 h-5 text-brand-primary" />,
      desc: 'Send your request online or directly via WhatsApp with your venue location. No upfront online payment is required during demonstration.',
    },
    {
      number: '4',
      title: 'Local Tempo Delivery & Setup',
      icon: <Truck className="w-5 h-5 text-brand-primary" />,
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
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-14">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-primary block">
          Simple & Hassle-Free
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-charcoal">
          How Eventora Rentals Work
        </h1>
        <p className="text-xs sm:text-sm text-brand-charcoal/70 leading-relaxed">
          Affordable, friendly local event equipment rental designed for everyday Indian families and local organizers.
        </p>
      </div>

      {/* 4 Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step) => (
          <div
            key={step.number}
            className="p-5 bg-white border border-brand-sand rounded-lg space-y-3 shadow-subtle"
          >
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 bg-brand-primary-soft rounded-md flex items-center justify-center">
                {step.icon}
              </span>
              <span className="text-2xl font-black text-brand-sand">
                0{step.number}
              </span>
            </div>
            <h3 className="text-base font-bold text-brand-charcoal">
              {step.title}
            </h3>
            <p className="text-xs text-brand-charcoal/70 leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Direct WhatsApp Callout */}
      <div className="p-6 bg-green-50 border border-green-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-base text-green-950">
            Have custom requirements or need urgent same-day chairs?
          </h3>
          <p className="text-xs text-green-800">
            Send us a quick WhatsApp message with your city and approximate guest count.
          </p>
        </div>
        <a
          href={`https://wa.me/${siteConfig.whatsapp.number.replace(/\D/g, '')}?text=Namaste!%20I%20need%20chairs/tent%20rental%20information.`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-md flex items-center gap-2 shrink-0 shadow-xs"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="text-center space-y-1 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-brand-charcoal">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-brand-charcoal/60">
            Common questions about local delivery, pricing, and bookings.
          </p>
        </div>

        <div className="divide-y divide-brand-sand border border-brand-sand rounded-lg bg-white overflow-hidden shadow-subtle">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="p-4">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-3 text-sm font-bold text-brand-charcoal hover:text-brand-primary"
                >
                  <span>{faq.q}</span>
                  <span className="p-1 bg-brand-sand-light rounded shrink-0">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-2.5 text-xs text-brand-charcoal/80 leading-relaxed animate-in fade-in">
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
        <h3 className="text-lg font-bold text-brand-charcoal">
          Ready to select items for your upcoming event?
        </h3>
        <Link to="/rentals">
          <Button variant="primary" size="lg" className="bg-brand-primary hover:bg-brand-primary-dark font-bold">
            Browse All Rental Items
          </Button>
        </Link>
      </div>
    </div>
  );
};
