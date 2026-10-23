import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Share2,
  Package,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageCircle,
  Check,
} from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useLocationContext } from '../context/LocationContext';
import { formatPrice, calculateDaysBetween, getDefaultRentalDates } from '../utils/formatters';
import { calculateItemSubtotal } from '../utils/pricing';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { DateRangePicker } from '../components/ui/DateRangePicker';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/cards/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem, openCart } = useCart();
  const { isFavorite, toggleFavorite } = useWishlist();
  const { city, pincode } = useLocationContext();

  const product = products.find((p) => p.slug === slug);

  const defaultDates = getDefaultRentalDates();
  const [selectedDates, setSelectedDates] = useState(defaultDates);
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants ? product.variants[0]?.id : undefined
  );
  const [quantity, setQuantity] = useState(product?.minQuantity || 1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">
          Product Not Found
        </h2>
        <p className="text-xs text-slate-500">
          The requested rental item could not be found in our current catalogue.
        </p>
        <Button variant="primary" onClick={() => navigate('/rentals')}>
          Return to Catalogue
        </Button>
      </div>
    );
  }

  const favorite = isFavorite(product.id);
  const rentalDays = calculateDaysBetween(selectedDates.start, selectedDates.end);
  const calculatedSubtotal = calculateItemSubtotal(
    product.rentalPrice,
    quantity,
    rentalDays,
    product.pricingUnit
  );

  const selectedVariantObj = product.variants?.find((v) => v.id === selectedVariant);

  const handleAddToCart = () => {
    addItem(
      product,
      quantity,
      selectedDates,
      selectedVariant,
      selectedVariantObj?.name
    );
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      openCart();
    }, 600);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const whatsappInquiryUrl = generateWhatsAppLink({
    items: [
      {
        id: `${product.id}-${selectedVariant || 'default'}`,
        productId: product.id,
        product,
        variantName: selectedVariantObj?.name,
        quantity,
        startDate: selectedDates.start,
        endDate: selectedDates.end,
        rentalDays,
        unitPrice: product.rentalPrice,
        subtotal: calculatedSubtotal,
      },
    ],
    city,
    pincode,
    startDate: selectedDates.start,
    endDate: selectedDates.end,
  });

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-slate-400 flex items-center gap-2 flex-wrap">
        <Link to="/" className="hover:text-emerald-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link to="/rentals" className="hover:text-emerald-600 transition-colors">
          Rentals
        </Link>
        <span>/</span>
        <Link
          to={`/rentals?category=${product.categoryId}`}
          className="hover:text-emerald-600 transition-colors"
        >
          {product.categoryName}
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Col: Image Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="relative aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm group">
            <img
              src={product.gallery[activeImageIndex] || product.image}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.src = '/images/products/chairs/gold-chiavari-chair.jpg';
              }}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="text-xs bg-slate-900 text-white font-bold px-3 py-1 rounded-full shadow-xs">
                {product.categoryName}
              </span>
              {product.minQuantity && product.minQuantity > 1 && (
                <span className="text-xs bg-emerald-600 text-white font-bold px-3 py-1 rounded-full shadow-xs">
                  Min order: {product.minQuantity} pcs
                </span>
              )}
            </div>

            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => toggleFavorite(product.id)}
                className={`p-2.5 rounded-full shadow-md transition-all ${
                  favorite
                    ? 'bg-rose-50 text-rose-600'
                    : 'bg-white/90 backdrop-blur-xs text-slate-700 hover:text-rose-600 hover:bg-white'
                }`}
                aria-label="Save item"
              >
                <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2.5 bg-white/90 backdrop-blur-xs hover:bg-white text-slate-700 rounded-full shadow-md transition-all"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {copiedLink && (
              <div className="absolute bottom-4 right-4 bg-slate-900 text-white text-xs px-3.5 py-1.5 rounded-xl shadow-lg">
                Link copied to clipboard!
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-emerald-600 shadow-sm scale-102'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Description & Technical Details */}
          <div className="pt-8 border-t border-slate-200 space-y-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                About This Rental Item
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
              <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider">
                Specifications & Sizing
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {product.dimensions && (
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Dimensions:</span>
                    <span className="font-bold text-slate-800">{product.dimensions}</span>
                  </div>
                )}
                {product.material && (
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Material:</span>
                    <span className="font-bold text-slate-800">{product.material}</span>
                  </div>
                )}
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Suitable For:</span>
                  <span className="font-bold text-slate-800 capitalize">
                    {product.eventTypes.join(', ')}
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Local Service City:</span>
                  <span className="font-bold text-emerald-700">{city} ({pincode})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Booking Card (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="sticky top-28 bg-white border border-slate-200/90 p-6 sm:p-7 rounded-3xl shadow-md space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  {product.categoryName}
                </span>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Stock Available in {city}</span>
                </span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {product.name}
              </h1>
              {product.hindiName && (
                <span className="text-xs sm:text-sm text-slate-400 block font-medium mt-0.5">
                  {product.hindiName}
                </span>
              )}
            </div>

            {/* Price Box */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex items-baseline justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-emerald-700">
                  {formatPrice(product.rentalPrice)}
                </span>
                <span className="text-xs text-slate-600 ml-1.5 font-bold">
                  /{product.pricingUnit.replace('per ', '')}
                </span>
              </div>
              <span className="text-[11px] text-emerald-800 font-semibold bg-white/80 px-2 py-0.5 rounded-md">
                Standard daily rate
              </span>
            </div>

            {/* Variants Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 block">
                  Select Color / Pattern:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((v) => {
                    const active = selectedVariant === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v.id)}
                        className={`p-2.5 text-xs font-bold rounded-xl border text-center transition-all ${
                          active
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {v.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector with Bulk quick chips */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  Quantity Required:
                </span>
                {product.minQuantity && product.minQuantity > 1 && (
                  <span className="text-[11px] font-semibold text-slate-400">
                    Min: {product.minQuantity} pcs
                  </span>
                )}
              </div>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                min={product.minQuantity || 1}
                max={2000}
                bulkOptions={product.bulkOptions}
              />
            </div>

            {/* Rental Dates */}
            <DateRangePicker
              startDate={selectedDates.start}
              endDate={selectedDates.end}
              onChange={setSelectedDates}
              label="Event Delivery & Return Dates"
            />

            {/* Calculated Estimate Box */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-600">
                  Estimated Rental ({quantity} qty × {rentalDays} {rentalDays === 1 ? 'day' : 'days'}):
                </span>
                <span className="text-lg font-black text-slate-900">
                  {formatPrice(calculatedSubtotal)}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                * Tempo delivery & installation charges confirmed by local tent house upon inquiry.
              </p>
            </div>

            {/* Actions: Add to Cart + WhatsApp */}
            <div className="space-y-2.5 pt-1">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                icon={addedNotice ? <Check className="w-4 h-4" /> : <Package className="w-4 h-4" />}
                className="font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl shadow-md"
              >
                {addedNotice ? 'Added to Cart!' : 'Add To Rental Cart'}
              </Button>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-slate-950" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>

            {/* Practical Assurances */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-500">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Clean & washed stock checked before delivery.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Delivered directly to your event venue or home.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Easy count adjustments up to 2 days prior.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                Frequently Rented Together
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                You May Also Need
              </h2>
            </div>
            <Link
              to={`/rentals?category=${product.categoryId}`}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>View More</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
