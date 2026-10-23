import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { EventInspiration } from '../../data/inspirations';

export interface InspirationCardProps {
  inspiration: EventInspiration;
}

export const InspirationCard: React.FC<InspirationCardProps> = ({ inspiration }) => {
  return (
    <div className="group bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Photograph */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={inspiration.image}
          alt={inspiration.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/images/products/stages/haldi-urli-ceremony-setup.jpg';
          }}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-3 left-3">
          <span className="text-[11px] uppercase tracking-wider font-bold px-3 py-1 bg-slate-900/80 text-white backdrop-blur-xs rounded-full shadow-xs">
            {inspiration.eventType}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-700 font-bold block mb-1">
            {inspiration.subtitle}
          </span>
          <h3 className="text-xl font-black text-slate-900 mb-2 leading-snug">
            {inspiration.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            {inspiration.description}
          </p>
        </div>

        {/* Featured Items and Action */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-2 font-bold">
              Featured In This Curation:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {inspiration.featuredItems.map((item) => (
                <Link
                  key={item.slug}
                  to={`/rentals/${item.slug}`}
                  className="text-xs bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 px-3 py-1 rounded-xl border border-slate-200 transition-colors inline-flex items-center gap-1.5 font-medium shadow-2xs"
                >
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link
            to={`/rentals?eventType=${inspiration.eventType}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 hover:text-emerald-800 pt-1 group/link"
          >
            <span>Explore {inspiration.eventType} Collection</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};
