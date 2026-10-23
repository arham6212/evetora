import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Truck,
  MapPin,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { useLocationContext } from '../context/LocationContext';
import { ProductCard } from '../components/cards/ProductCard';
import { CategoryCard } from '../components/cards/CategoryCard';
import { EventEstimator } from '../components/features/estimator/EventEstimator';
import { EventLookbook } from '../components/features/lookbook/EventLookbook';
import { Button } from '../components/ui/Button';

interface HomePageProps {
  onOpenBooking: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking }) => {
  const navigate = useNavigate();
  const { city, pincode, openLocationModal } = useLocationContext();

  const popularProducts = products.filter((p) => p.featured).slice(0, 8);

  const eventPlanningTypes = [
    { id: 'wedding', title: 'Wedding & Haldi', hindi: 'शादी व हल्दी', icon: '💍', desc: 'Shamiana, banquet chairs, yellow drapes & red carpet', badge: 'High Demand' },
    { id: 'birthday', title: 'Birthday Party', hindi: 'जन्मदिन पार्टी', icon: '🎂', desc: 'Balloon arch ring, snack tables, chairs & fairy lights', badge: 'Popular' },
    { id: 'puja', title: 'Puja & Jagran', hindi: 'पूजा व जागरण', icon: '🪔', desc: 'Cotton floor durries, wooden chowkis, brass diyas & mic', badge: 'Essential' },
    { id: 'engagement', title: 'Engagement / Roka', hindi: 'सगाई / रोका', icon: '✨', desc: 'VIP stage sofa, covered chairs & buffet food counters', badge: 'Trending' },
    { id: 'family', title: 'Family Gathering', hindi: 'पारिवारिक समारोह', icon: '👨‍👩‍👧‍👦', desc: 'Round dining tables, plastic chairs & water coolers', badge: 'Affordable' },
    { id: 'school', title: 'School / College Event', hindi: 'वार्षिक उत्सव', icon: '🎓', desc: 'Raised wooden stage, backdrop curtain & PA speaker', badge: 'Bulk' },
    { id: 'shop', title: 'Shop Opening', hindi: 'दुकान उद्घाटन', icon: '🏪', desc: 'Entrance red carpet, VIP chairs, gazebo canopy & ribbon setup', badge: 'Commercial' },
    { id: 'community', title: 'Community Function', hindi: 'सोसाइटी सभा', icon: '🤝', desc: 'Folding chairs, floodlights, stage decks & mic sets', badge: 'Custom' },
  ];

  const testimonials = [
    {
      name: 'Manoj Bajpai',
      city: 'Lucknow',
      event: "Daughter's Haldi Ceremony",
      text: 'Rented 150 plastic chairs, yellow backdrop drapes, and a 30x45 shamiana. The chairs were genuinely clean and washed, arrived 2 hours before the function by tempo. Saved us at least ₹4,000 compared to our local broker.',
      rating: 5,
      items: '150 Chairs • Yellow Drapes • 1 Shamiana',
    },
    {
      name: 'Sunita Agarwal',
      city: 'Jaipur',
      event: 'Satyanarayan Puja & Bhajan',
      text: 'Booking cotton floor durries, wooden chowkis, and sound speakers online was so convenient. They confirmed our PIN code immediately and delivered right on time.',
      rating: 5,
      items: '6 Durries • 12 Chowkis • Mic & PA Set',
    },
    {
      name: 'Vikas Sharma',
      city: 'Indore',
      event: '1st Birthday Celebration',
      text: 'The gold ring balloon frame and buffet tables made the hall look fantastic. Everything was delivered smoothly and collected the next morning without any hassle.',
      rating: 5,
      items: 'Circular Arch • 4 Buffet Tables • 40 Chairs',
    },
  ];

  return (
    <div className="space-y-14 sm:space-y-20 pb-20">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 border-b border-slate-200/80 pt-8 pb-14 sm:pb-20">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headlines & Actions (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Local Area Pill */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={openLocationModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-emerald-300 text-emerald-800 rounded-full text-xs font-bold shadow-2xs hover:border-emerald-500 transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Delivering in {city} ({pincode})</span>
                  <span className="text-[10px] text-emerald-600 underline ml-1 font-semibold">Change</span>
                </button>

                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>15+ Cities Covered</span>
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12]">
                Rent Everything for Your Event, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Delivered & Set Up</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                Nilkamal chairs, waterproof shamianas, buffet tables, sound systems & Haldi decor for weddings, birthdays, pujas, and local functions in your city.
              </p>

              {/* Action Buttons */}
              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/rentals')}
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  className="font-bold text-sm bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20"
                >
                  Browse Rental Items ({products.length})
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={openLocationModal}
                  icon={<MapPin className="w-4 h-4 text-emerald-600" />}
                  iconPosition="left"
                  className="font-bold text-sm bg-white hover:bg-slate-50 border-slate-300"
                >
                  Check Stock in {city}
                </Button>
              </div>

              {/* Quick Category Chips */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 mr-1">Popular:</span>
                {[
                  { label: '🪑 Chairs (from ₹10)', slug: 'chairs' },
                  { label: '🎪 Shamiana (from ₹1,800)', slug: 'tents' },
                  { label: '🍽️ Tables', slug: 'tables' },
                  { label: '💡 Lights & Mic', slug: 'lighting' },
                  { label: '🍲 Catering Degs', slug: 'crockery' },
                ].map((chip) => (
                  <button
                    key={chip.slug}
                    onClick={() => navigate(`/rentals?category=${chip.slug}`)}
                    className="px-2.5 py-1 bg-white hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 rounded-full text-xs font-semibold text-slate-700 transition-all shadow-2xs"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-4 border-t border-slate-200/80 grid grid-cols-3 gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
                    ₹
                  </div>
                  <span className="font-semibold text-slate-800">Direct Daily Rates</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-semibold text-slate-800">Tempo Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-semibold text-slate-800">Clean & Inspected</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card with Overlays (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white group">
                <img
                  src="/images/hero_indian_event.jpg"
                  alt="Neat plastic chairs and tent setup for an Indian family celebration"
                  onError={(e) => {
                    e.currentTarget.src = '/images/products/stages/haldi-urli-ceremony-setup.jpg';
                  }}
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Floating Glass Pill Top Left */}
                <div className="absolute top-4 left-4 glass-card px-3 py-1.5 rounded-full border border-white/60 shadow-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-badge" />
                  <span className="text-xs font-bold text-slate-900">Verified Tent House Stock</span>
                </div>

                {/* Floating Rating Badge Top Right */}
                <div className="absolute top-4 right-4 glass-card px-2.5 py-1.5 rounded-full border border-white/60 shadow-md flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                  <span className="text-xs font-black text-slate-900">4.9</span>
                  <span className="text-[10px] text-slate-500">(2,400+ events)</span>
                </div>

                {/* Bottom Overlay Info Banner */}
                <div className="absolute bottom-4 left-4 right-4 glass-card p-4 rounded-2xl border border-white/60 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black text-slate-900 block">
                      Local Tent & Chair Rentals
                    </span>
                    <span className="text-[11px] font-medium text-slate-600 block">
                      Chairs from <strong className="text-emerald-700 font-bold">₹10/day</strong> • Shamiana from <strong className="text-emerald-700 font-bold">₹1,800/day</strong>
                    </span>
                  </div>
                  <Link
                    to="/rentals"
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>View Rates</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== INTERACTIVE EVENT ESTIMATOR ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EventEstimator />
      </section>

      {/* ===================== QUICK CATEGORY NAVIGATION ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Equipment Categories
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              What Do You Need to Rent?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore 11 organized categories ready for delivery in {city}.
            </p>
          </div>
          <Link
            to="/categories"
            className="text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Explore All 11 Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* ===================== "WHAT ARE YOU PLANNING?" EVENT PACKAGES ===================== */}
      <section className="bg-slate-100/70 border-y border-slate-200/80 py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Event-Based Packages</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              What Are You Planning?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
              Select your celebration to discover recommended chairs, tents, stage, and catering setups.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {eventPlanningTypes.map((evt) => (
              <button
                key={evt.id}
                onClick={() => navigate(`/rentals?eventType=${evt.id}`)}
                className="p-5 bg-white hover:bg-emerald-50/50 border border-slate-200/80 hover:border-emerald-400 rounded-2xl text-left transition-all duration-300 shadow-2xs hover:shadow-lg hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl p-2 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform">
                      {evt.icon}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-800 transition-colors">
                      {evt.badge}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {evt.title}
                  </h3>
                  <span className="text-xs text-slate-400 block mb-2 font-medium">
                    {evt.hindi}
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {evt.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                  <span>Browse Items</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== POPULAR RENTAL ITEMS ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Top Choices in {city}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Rented Items
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Durable chairs, waterproof shamianas, buffet tables & degs with clear per-day rates.
            </p>
          </div>
          <Link
            to="/rentals"
            className="text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View All ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ===================== WHY CHOOSE EVENTORA (TRUST PILLARS) ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
            Reliable Local Service
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Why Host Families Trust Eventora
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            We eliminate the uncertainty and stress of booking tent house items.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
              title: 'Clean & Washed Stock',
              desc: 'Every chair, tablecloth, and mattress is cleaned and inspected before dispatch. No dirty plastic or torn shamianas.',
            },
            {
              icon: <Truck className="w-6 h-6 text-emerald-600" />,
              title: 'On-Time Venue Tempo',
              desc: 'Direct tempo delivery coordinated with your schedule. Arrives well before guests arrive so you never have to panic.',
            },
            {
              icon: <Sparkles className="w-6 h-6 text-emerald-600" />,
              title: 'Transparent Daily Rates',
              desc: 'No hidden percentage deposits or random broker markups. Standardized, affordable per-day rates in Indian Rupees.',
            },
            {
              icon: <MessageCircle className="w-6 h-6 text-emerald-600" />,
              title: 'WhatsApp Assistance',
              desc: 'Need help figuring out tent dimensions or chair quantities? Our local team assists you over 1-click WhatsApp.',
            },
          ].map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-2xs hover:shadow-md transition-shadow space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                {pillar.icon}
              </div>
              <h3 className="font-extrabold text-base text-slate-900">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== REAL EVENT LOOKBOOK (NEW INSPIRATION) ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EventLookbook />
      </section>

      {/* ===================== REAL CUSTOMER REVIEWS ===================== */}
      <section className="bg-slate-100/70 border-y border-slate-200/80 py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                Verified Feedback
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                What Host Families Say
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Real feedback from recent weddings, pujas, and family gatherings.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-extrabold text-slate-900">4.9 / 5.0</span>
              <span className="text-xs text-slate-400">• 2,400+ Events</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-lg transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      {t.city}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900">{t.name}</h4>
                    <span className="text-[10px] text-slate-400 block">{t.event}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                    {t.items}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CITY COVERAGE BANNER ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-white/15 px-3 py-1 rounded-full inline-block">
              City-Wide Tent House Network
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Serving {city} and 15+ Cities Across India
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              We partner with vetted local tent houses in Lucknow, Jaipur, Indore, Bhopal, Nagpur, and beyond. Select your city to check stock and tempo transport.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={openLocationModal}
              className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-slate-100 text-emerald-900 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Select PIN or City</span>
            </button>
            <a
              href={`https://wa.me/${siteConfig.whatsapp.number.replace(/\D/g, '')}?text=Namaste%20Eventora!%20I%20want%20to%20check%20rental%20delivery%20for%20my%20area.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
            Easy 4-Step Booking
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How Renting Works on Eventora
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            No complicated paperwork or broker visits. Everything organized online in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              step: '01',
              title: 'Choose Rental Items',
              desc: 'Select plastic chairs, shamiana tents, buffet tables, or lights based on your guest count.',
            },
            {
              step: '02',
              title: 'Pick Quantities & Dates',
              desc: 'Select your needed chair quantity (+25, +50, +100) and choose your event date range.',
            },
            {
              step: '03',
              title: 'Enter Location & Area',
              desc: 'Provide your city or 6-digit PIN code so the provider calculates local tempo delivery.',
            },
            {
              step: '04',
              title: 'Provider Confirmation',
              desc: 'The verified local tent house confirms stock, arranges tempo dispatch, and sets up on venue.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-6 bg-white border border-slate-200/90 rounded-2xl relative space-y-3 shadow-2xs hover:shadow-md transition-shadow"
            >
              <span className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center">
                {item.step}
              </span>
              <h3 className="font-extrabold text-base text-slate-900">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== QUICK CONTACT BANNER ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-black text-xl sm:text-2xl text-white tracking-tight">
              Need assistance calculating chair or tent sizes?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Speak directly with our local coordinator for advice on guest capacity and tent dimensions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, '')}`}
              className="w-full sm:w-auto px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors border border-white/10"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Call: {siteConfig.contact.phone}</span>
            </a>
            <Button
              variant="primary"
              size="md"
              onClick={onOpenBooking}
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider py-3 px-5 rounded-xl"
            >
              Request Custom Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
