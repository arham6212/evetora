import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ShieldCheck, Users, Truck, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { useLocationContext } from '../context/LocationContext';

export const AboutPage: React.FC = () => {
  const { city } = useLocationContext();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>About Evento</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            Serving {city} & 15+ Cities
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Affordable Event Rentals for Every Family & Community
        </h1>
        <p className="text-xs sm:text-base text-slate-500 max-w-2xl leading-relaxed">
          Evento was created to solve a genuine problem faced by families and local event organizers across Indian cities: finding reliable, clean rental equipment at fair, transparent rates without running around local markets or dealing with unreliable brokers.
        </p>
      </div>

      {/* Realistic Photo Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md aspect-[21/9]">
        <img
          src="/images/hero_indian_event.jpg"
          alt="Evento Indian Event Rentals setup with plastic chairs and shamiana"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex items-end p-6 sm:p-8 text-white">
          <div className="max-w-xl space-y-1">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">Our Core Belief</span>
            <p className="text-base sm:text-xl font-bold leading-snug">
              "Every birthday, haldi ceremony, and community puja deserves clean chairs, comfortable seating, and dependable delivery on time."
            </p>
          </div>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-3 shadow-2xs hover:shadow-md transition-shadow">
          <div className="w-11 h-11 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900">
            Built for Real Budgets
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            From ₹10 plastic chairs for a 50-person family katha to full wedding shamiana pandals, we cater to practical budgets without hidden fees or surprise broker commissions.
          </p>
        </div>

        <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-3 shadow-2xs hover:shadow-md transition-shadow">
          <div className="w-11 h-11 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900">
            Clean & Washed Stock
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Nobody wants dusty chairs or stained tablecloths at their celebration. Our partner tent houses wash and wipe down equipment before every vehicle dispatch.
          </p>
        </div>

        <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-3 shadow-2xs hover:shadow-md transition-shadow">
          <div className="w-11 h-11 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center font-bold">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900">
            Reliable Local Logistics
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Coordinated with experienced local commercial tempo drivers and tent workers who know your neighborhood streets, colonies, and venue access points.
          </p>
        </div>
      </div>

      {/* Call to action card */}
      <div className="p-6 sm:p-8 bg-slate-900 text-white rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-extrabold text-lg sm:text-xl text-white">
            Plan your next family or community gathering with ease.
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Check rates, choose quantities, and request equipment in just a few taps.
          </p>
        </div>
        <Link to="/rentals">
          <Button variant="primary" size="lg" className="bg-emerald-600 hover:bg-emerald-500 font-bold text-xs sm:text-sm shadow-md" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
            View Price List
          </Button>
        </Link>
      </div>
    </div>
  );
};
