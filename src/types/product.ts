export type PricingUnit =
  | 'per day'
  | 'per chair/day'
  | 'per table/day'
  | 'per setup/day'
  | 'per event'
  | 'per piece/day'
  | 'per roll/day'
  | 'per pair'
  | 'per pair of 2'
  | 'per 2-hour performance'
  | 'per bungalow setup'
  | string;

export interface ProductVariant {
  id: string;
  name: string;
  colorHex?: string;
  priceModifier?: number;
}

export type EventTypeTag =
  | 'wedding'
  | 'birthday'
  | 'engagement'
  | 'puja'
  | 'family'
  | 'school'
  | 'shop'
  | 'community';

export interface Product {
  id: string;
  slug: string;
  name: string;
  hindiName?: string;
  categoryId: string;
  categoryName: string;
  tagline: string;
  description: string;
  image: string;
  gallery: string[];
  rentalPrice: number; // Demo price in INR (₹)
  pricingUnit: PricingUnit;
  minQuantity?: number;
  bulkOptions?: number[]; // e.g. [20, 50, 100, 200] for quick selection
  dimensions?: string;
  material?: string;
  colorOptions?: string[];
  variants?: ProductVariant[];
  tags: string[];
  featured?: boolean;
  isNew?: boolean;
  eventTypes: EventTypeTag[];
  demoAvailability: 'Available' | 'High Demand' | 'Consult Specialist' | 'Limited Availability';
}

export interface ProductFilterState {
  category: string;
  search: string;
  eventType: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'name-asc';
}
