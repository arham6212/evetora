import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, CheckCircle2, MapPin } from 'lucide-react';

interface LookbookItem {
  id: string;
  title: string;
  city: string;
  eventType: 'wedding' | 'haldi' | 'reception';
  image: string;
  tagline: string;
  rentedItems: { name: string; slug: string; price: string }[];
}

export const EventLookbook: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'wedding' | 'haldi' | 'reception'>('all');

  const lookbookItems: LookbookItem[] = [
    {
      id: 'look-1',
      title: 'Aayush & Priya’s Traditional Pheras',
      city: 'Lucknow',
      eventType: 'wedding',
      image: '/images/inspiration/royal-maroon-wedding-couple.jpg',
      tagline: 'Royal heritage celebration with traditional mandap & red carpets',
      rentedItems: [
        { name: 'Red Aisle Carpet', slug: 'royal-mandala-printed-event-carpet', price: '₹950/day' },
        { name: 'Gold Chiavari Chairs', slug: 'gold-chiavari-chair-cushion', price: '₹65/pc' },
        { name: 'Mor Pankh Varmalas', slug: 'royal-mor-pankh-peacock-varmala-pair', price: '₹2,200/pr' },
      ],
    },
    {
      id: 'look-2',
      title: 'Vibrant Terrace Haldi & Mehendi',
      city: 'Jaipur',
      eventType: 'haldi',
      image: '/images/products/stages/haldi-urli-ceremony-setup.jpg',
      tagline: 'Golden lotus urli sitting tub with fresh marigold streams',
      rentedItems: [
        { name: 'Haldi Urli Stage Setup', slug: 'complete-haldi-ceremony-urli-stage', price: '₹3,500/day' },
        { name: 'Yellow Drapes & Matkas', slug: 'haldi-mehendi-yellow-fabric-drapes', price: '₹400/day' },
      ],
    },
    {
      id: 'look-3',
      title: 'Rohan & Simran’s Anand Karaj',
      city: 'Chandigarh',
      eventType: 'wedding',
      image: '/images/inspiration/punjabi-sikh-wedding-couple.jpg',
      tagline: 'Daytime lawn wedding with floral arch and Punjabi dhol troupe',
      rentedItems: [
        { name: 'Live Punjabi Dhol Party', slug: 'live-punjabi-dhol-tasha-troupe', price: '₹3,500' },
        { name: 'Circular Floral Arch', slug: 'floral-entrance-welcome-arch-gate', price: '₹1,800/day' },
      ],
    },
    {
      id: 'look-4',
      title: 'Sangeet & Dholki Night',
      city: 'Bhopal',
      eventType: 'haldi',
      image: '/images/products/stages/dholki-stage-backdrop.jpg',
      tagline: 'Illuminated neon stage with sequin couch & fairy curtains',
      rentedItems: [
        { name: 'Dholki Stage Backdrop', slug: 'dholki-neon-floral-stage-backdrop', price: '₹4,200/day' },
        { name: 'PA Sound Speaker & Mic', slug: 'portable-pa-sound-system-mic', price: '₹850/day' },
      ],
    },
    {
      id: 'look-5',
      title: 'Karthik & Sneha’s Garden Reception',
      city: 'Indore',
      eventType: 'reception',
      image: '/images/inspiration/modern-varmala-couple.jpg',
      tagline: 'Pastel garden dinner with shaded Dutch rose jaimala pair',
      rentedItems: [
        { name: 'Fresh Rose Varmalas', slug: 'fresh-rose-gypsophila-varmala-pair', price: '₹1,600/pr' },
        { name: 'Buffet Food Counters', slug: 'six-foot-buffet-serving-table', price: '₹120/day' },
      ],
    },
    {
      id: 'look-6',
      title: 'Wedding Bungalow Entrance Draping',
      city: 'Nagpur',
      eventType: 'wedding',
      image: '/images/products/tents/house-facade-tent-draping.jpg',
      tagline: 'Complete 3-story residential facade draping & marigold torans',
      rentedItems: [
        { name: 'House Facade Draping', slug: 'wedding-house-facade-tent-draping', price: '₹5,500' },
        { name: 'LED Floodlights', slug: 'led-floodlights-50w-outdoor', price: '₹150/day' },
      ],
    },
  ];

  const filtered = activeTab === 'all' ? lookbookItems : lookbookItems.filter((i) => i.eventType === activeTab);

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Camera className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Real Event Lookbook
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            See Evento Items in Real Celebrations
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real setups arranged by local tent houses across Lucknow, Jaipur, Bhopal, and Indore.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs font-bold">
          {[
            { id: 'all', label: 'All Celebrations' },
            { id: 'wedding', label: 'Weddings' },
            { id: 'haldi', label: 'Haldi & Sangeet' },
            { id: 'reception', label: 'Receptions' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-emerald-700 shadow-2xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Frame */}
            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = '/images/products/stages/haldi-urli-ceremony-setup.jpg';
                }}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

              <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-xs text-slate-900 text-[11px] font-bold rounded-full shadow-xs">
                <MapPin className="w-3 h-3 text-emerald-600" />
                <span>{item.city}</span>
              </span>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-extrabold text-base drop-shadow-sm leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-200 line-clamp-1 mt-0.5">
                  {item.tagline}
                </p>
              </div>
            </div>

            {/* Rented Items Pills */}
            <div className="p-4 space-y-3 bg-white">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Equipment Rented on Evento:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.rentedItems.map((rent, idx) => (
                  <Link
                    key={idx}
                    to={`/rentals/${rent.slug}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 transition-colors"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{rent.name}</span>
                    <span className="text-emerald-700 font-bold text-[10px]">({rent.price})</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
