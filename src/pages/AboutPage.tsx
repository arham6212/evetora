import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ShieldCheck, Users, Truck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      {/* Header */}
      <div className="max-w-2xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-primary block">
          About Eventora
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-charcoal">
          Affordable Event Rentals for Every Family & Community
        </h1>
        <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed">
          Eventora was created to solve a genuine problem faced by families and local event organizers across Indian cities: finding reliable, clean rental equipment at fair, transparent rates without running around local markets.
        </p>
      </div>

      {/* Realistic Photo Banner */}
      <div className="relative rounded-xl overflow-hidden border border-brand-sand shadow-subtle aspect-[21/9]">
        <img
          src="/images/hero_indian_event.jpg"
          alt="Eventora Indian Event Rentals"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4 sm:p-6 text-white">
          <p className="text-sm sm:text-lg font-bold max-w-xl">
            "Every birthday, haldi, and community puja deserves clean chairs, comfortable seating, and dependable delivery on time."
          </p>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-brand-sand rounded-lg space-y-2.5 shadow-subtle">
          <div className="w-10 h-10 bg-brand-primary-soft text-brand-primary rounded-md flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-brand-charcoal">
            Built for Real Budgets
          </h3>
          <p className="text-xs text-brand-charcoal/70 leading-relaxed">
            From ₹10 plastic chairs for a 50-person family katha to full wedding shamiana pandals, we cater to practical budgets without hidden costs.
          </p>
        </div>

        <div className="p-6 bg-white border border-brand-sand rounded-lg space-y-2.5 shadow-subtle">
          <div className="w-10 h-10 bg-brand-primary-soft text-brand-primary rounded-md flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-brand-charcoal">
            Clean & Washed Stock
          </h3>
          <p className="text-xs text-brand-charcoal/70 leading-relaxed">
            Nobody wants dusty chairs or stained tablecloths. Our partners wash and wipe down equipment before every single vehicle dispatch.
          </p>
        </div>

        <div className="p-6 bg-white border border-brand-sand rounded-lg space-y-2.5 shadow-subtle">
          <div className="w-10 h-10 bg-brand-primary-soft text-brand-primary rounded-md flex items-center justify-center font-bold">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-brand-charcoal">
            Reliable Local Logistics
          </h3>
          <p className="text-xs text-brand-charcoal/70 leading-relaxed">
            Coordinated with experienced local commercial tempo drivers and tent workers who know your neighborhood streets and venue access points.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="p-6 bg-brand-sand-light border border-brand-sand rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base text-brand-charcoal">
            Plan your next family or community gathering with ease.
          </h3>
          <p className="text-xs text-brand-charcoal/70">
            Check rates, choose quantities, and request equipment in just a few taps.
          </p>
        </div>
        <Link to="/rentals">
          <Button variant="primary" className="bg-brand-primary font-bold">
            View Price List
          </Button>
        </Link>
      </div>
    </div>
  );
};
