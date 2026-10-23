import React, { useState } from 'react';
import { Calculator, Sparkles, Check, ShoppingBag, HeartHandshake, Cake, Flame, Users } from 'lucide-react';
import { products } from '../../../data/products';
import { useCart } from '../../../context/CartContext';
import { formatPrice } from '../../../utils/formatters';

interface PackageRecommendation {
  chairs: number;
  tent: string | null;
  tentProductId?: string;
  tables: number;
  tableProductId?: string;
  lighting: string;
  lightingProductId?: string;
  estimatedPrice: number;
}

export const EventEstimator: React.FC = () => {
  const { addItem, openCart } = useCart();
  const [selectedEvent, setSelectedEvent] = useState<'wedding' | 'birthday' | 'puja' | 'family'>('wedding');
  const [guestCount, setGuestCount] = useState<number>(50);
  const [added, setAdded] = useState(false);

  // Dynamic calculations based on event and guest count
  const getRecommendation = (_event: string, guests: number): PackageRecommendation => {
    let chairCount = guests;
    let tentDesc = null;
    let tentId = undefined;
    let tableCount = Math.max(2, Math.ceil(guests / 25));
    let lightDesc = '2x Halogen Floodlights';
    let lightId = 'prod-light-001';

    if (guests <= 25) {
      chairCount = 25;
      tentDesc = '10x10 ft Gazebo Canopy';
      tentId = 'prod-tent-003';
    } else if (guests <= 50) {
      chairCount = 50;
      tentDesc = '15x30 ft Waterproof Shamiana';
      tentId = 'prod-tent-001';
    } else if (guests <= 100) {
      chairCount = 100;
      tentDesc = '30x45 ft Large Shamiana Pandal';
      tentId = 'prod-tent-002';
      lightDesc = '4x LED Floodlights + Rice Lights';
    } else {
      chairCount = 200;
      tentDesc = '30x45 ft Large Shamiana (x2)';
      tentId = 'prod-tent-002';
      lightDesc = '6x LED Floodlights + Focus Spotlights';
    }

    // Approximate cost calculation
    const chairCost = chairCount * 10;
    const tentCost = guests <= 25 ? 800 : guests <= 50 ? 1800 : guests <= 100 ? 3200 : 6400;
    const tableCost = tableCount * 120;
    const lightCost = 300;

    return {
      chairs: chairCount,
      tent: tentDesc,
      tentProductId: tentId,
      tables: tableCount,
      tableProductId: 'prod-tab-001',
      lighting: lightDesc,
      lightingProductId: lightId,
      estimatedPrice: chairCost + tentCost + tableCost + lightCost,
    };
  };

  const rec = getRecommendation(selectedEvent, guestCount);

  const handleAddBundleToCart = () => {
    // Find products
    const chairProduct = products.find((p) => p.id === 'prod-chr-001');
    const tableProduct = products.find((p) => p.id === 'prod-tab-001');
    const tentProduct = rec.tentProductId ? products.find((p) => p.id === rec.tentProductId) : null;
    const lightProduct = rec.lightingProductId ? products.find((p) => p.id === rec.lightingProductId) : null;

    if (chairProduct) addItem(chairProduct, rec.chairs);
    if (tableProduct) addItem(tableProduct, rec.tables);
    if (tentProduct) addItem(tentProduct, 1);
    if (lightProduct) addItem(lightProduct, 2);

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 800);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden border border-slate-700/60">
      {/* Background ambient decorative shapes */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Rental Estimator</span>
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
            Plan Equipment for Your Guests
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Tell us your guest size and occasion. We calculate exact chair counts, shamiana sizing, and buffet tables.
          </p>
        </div>

        {/* Step 1: Select Event Type */}
        <div className="space-y-3 mb-6">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            1. Select Occasion
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'wedding', label: 'Wedding / Haldi', icon: <HeartHandshake className="w-4 h-4 text-emerald-400" /> },
              { id: 'birthday', label: 'Birthday Party', icon: <Cake className="w-4 h-4 text-amber-400" /> },
              { id: 'puja', label: 'Puja / Religious', icon: <Flame className="w-4 h-4 text-orange-400" /> },
              { id: 'family', label: 'Family Gathering', icon: <Users className="w-4 h-4 text-blue-400" /> },
            ].map((evt) => (
              <button
                key={evt.id}
                onClick={() => setSelectedEvent(evt.id as any)}
                className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                  selectedEvent === evt.id
                    ? 'bg-emerald-600/90 border-emerald-400 text-white shadow-md shadow-emerald-900/40'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  {evt.icon}
                </div>
                <span className="text-xs font-bold">{evt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Select Guest Count */}
        <div className="space-y-3 mb-8">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            2. Expected Guest Count
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[25, 50, 100, 200].map((count) => (
              <button
                key={count}
                onClick={() => setGuestCount(count)}
                className={`py-3 px-4 rounded-2xl border text-center transition-all ${
                  guestCount === count
                    ? 'bg-emerald-500 text-slate-900 border-emerald-300 font-black shadow-lg shadow-emerald-500/20'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 font-bold'
                }`}
              >
                <div className="text-base sm:text-lg">{count} Guests</div>
                <div className="text-[10px] opacity-75">{count <= 50 ? 'Small Function' : count <= 100 ? 'Medium Function' : 'Large Gathering'}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Recommendation Result Card */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 sm:p-6 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Inventory Breakdown */}
            <div className="space-y-3 w-full lg:w-2/3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Recommended Setup for {guestCount} Guests
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>{rec.chairs}x</strong> White Plastic Armless Chairs</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>1x</strong> {rec.tent}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>{rec.tables}x</strong> 6-Ft Buffet Tables with Frills</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>{rec.lighting}</strong></span>
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-end justify-center pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-slate-800 lg:pl-6 text-center lg:text-right">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Estimated Daily Rate</span>
              <div className="text-2xl sm:text-3xl font-black text-white my-1">
                {formatPrice(rec.estimatedPrice)}
                <span className="text-xs font-normal text-slate-400 ml-1">/ day</span>
              </div>
              <span className="text-[10px] text-slate-400 mb-3">Tempo transport confirmed by provider</span>

              <button
                onClick={handleAddBundleToCart}
                className="w-full py-3 px-5 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-slate-950" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Complete Setup</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
