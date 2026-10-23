import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { EventInspiration } from '../../data/inspirations';

export interface InspirationCardProps {
  inspiration: EventInspiration;
}

export const InspirationCard: React.FC<InspirationCardProps> = ({ inspiration }) => {
  return (
    <div className="group bg-white border border-brand-sand rounded-xs overflow-hidden shadow-subtle hover:shadow-elevated transition-luxury flex flex-col">
      {/* Photograph */}
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-sand-light">
        <img
          src={inspiration.image}
          alt={inspiration.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-3 left-3">
          <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 bg-brand-charcoal/85 text-white backdrop-blur-md rounded-xs">
            {inspiration.eventType}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-brand-olive font-semibold block mb-1">
            {inspiration.subtitle}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-medium text-brand-charcoal mb-2">
            {inspiration.title}
          </h3>
          <p className="text-xs text-brand-charcoal/70 leading-relaxed">
            {inspiration.description}
          </p>
        </div>

        {/* Featured Items and Action */}
        <div className="pt-3 border-t border-brand-sand/60 space-y-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-brand-taupe block mb-1.5 font-medium">
              Featured In This Curation:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {inspiration.featuredItems.map((item) => (
                <Link
                  key={item.slug}
                  to={`/rentals/${item.slug}`}
                  className="text-[11px] bg-brand-sand-light hover:bg-brand-sand text-brand-charcoal px-2.5 py-1 rounded-xs border border-brand-sand transition-colors inline-flex items-center gap-1"
                >
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link
            to={`/rentals?eventType=${inspiration.eventType}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-charcoal hover:text-brand-olive pt-1 group/link"
          >
            <span>Explore {inspiration.eventType} Collection</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};
