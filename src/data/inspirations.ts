export interface EventInspiration {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  eventType: string;
  featuredItems: {
    name: string;
    slug: string;
  }[];
  palette: string[];
}

export const eventInspirations: EventInspiration[] = [
  {
    id: 'insp-weddings',
    title: 'Grand Estate Wedding',
    subtitle: 'Classic Romance & Ethereal Glass Marquees',
    description:
      'Immerse guests in timeless grandeur with illuminated clear-top marquee structures, champagne gold Chiavari seating, flowing floor-length Belgian linens, and soft candlelit chandeliers.',
    image: '/images/wedding_reception.jpg',
    eventType: 'wedding',
    featuredItems: [
      { name: 'Champagne Gold Chiavari Chair', slug: 'gold-chiavari-chair' },
      { name: 'Clear-Span Glass Marquee', slug: 'clear-span-marquee-tent' },
      { name: 'Maria Theresa Crystal Chandelier', slug: 'maria-theresa-crystal-chandelier' },
    ],
    palette: ['#FAF8F4', '#C5A880', '#E9E0D5', '#242321'],
  },
  {
    id: 'insp-corporate',
    title: 'Global Executive Summit',
    subtitle: 'Architectural Staging & VIP Lounges',
    description:
      'Engineered for thought leadership and executive galas. Features crisp modular carpeted stages, Italian velvet armchairs, fluted travertine accents, and wireless precision wash lighting.',
    image: '/images/corporate_event.jpg',
    eventType: 'corporate',
    featuredItems: [
      { name: 'Pro-Deck Modular Stage Platform', slug: 'pro-deck-modular-stage-platform' },
      { name: 'Olive Velvet Dining Armchair', slug: 'velvet-dining-armchair' },
      { name: 'Architectural LED Uplight Kit', slug: 'architectural-wireless-uplight-kit' },
    ],
    palette: ['#242321', '#747B61', '#A69A8B', '#FAF8F4'],
  },
  {
    id: 'insp-outdoor',
    title: 'Twilight Garden Soirée',
    subtitle: 'Artisanal Timber & Bistro Illumination',
    description:
      'Organic courtyard celebration styled with hand-hewn French oak farmhouse tables, brass hurricane lanterns, ceramic place settings, and warm overhead festoon ambiance.',
    image: '/images/outdoor_celebration.jpg',
    eventType: 'outdoor',
    featuredItems: [
      { name: 'French Oak Farmhouse Table', slug: 'french-oak-farmhouse-table' },
      { name: 'Antiqued Brass Hurricane Lanterns', slug: 'antiqued-brass-lantern-trio' },
      { name: 'Curved Ivory Bouclé Lounge Sofa', slug: 'curved-boucle-lounge-sofa' },
    ],
    palette: ['#E9E0D5', '#747B61', '#C5BCB1', '#242321'],
  },
  {
    id: 'insp-galas',
    title: 'Black-Tie Charity Gala',
    subtitle: 'Dramatic Velvet Drapes & Champagne Towers',
    description:
      'Sumptuous theatrical drapery framing formal 72-inch round banquet tables, complete with tiered crystal champagne coupes and custom stage platforms for keynote speakers.',
    image: '/images/hero_luxury_event.jpg',
    eventType: 'gala',
    featuredItems: [
      { name: 'Theatrical Velvet Stage Drapes', slug: 'theatrical-velvet-stage-drapes' },
      { name: '72" Grand Round Banquet Table', slug: 'round-banquet-table' },
      { name: 'Crystal Champagne Coupe Tower', slug: 'crystal-champagne-coupe-tower' },
    ],
    palette: ['#242321', '#FAF8F4', '#C5A880', '#747B61'],
  },
];
