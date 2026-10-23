import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Category } from '../../types/category';

export interface CategoryCardProps {
  category: Category;
  aspect?: 'square' | 'portrait' | 'landscape';
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/rentals?category=${category.slug}`}
      className="group flex flex-col bg-white border border-slate-200/80 hover:border-emerald-500/50 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-[16/11] bg-slate-100 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/images/products/stages/haldi-urli-ceremony-setup.jpg';
          }}
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Item Count Pill */}
        <div className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold rounded-full shadow-xs">
          {category.itemCount} Items
        </div>

        {/* Category Name Overlaid on Image Bottom for Punchy Visual */}
        <div className="absolute bottom-2.5 left-3 right-3 text-white">
          <h3 className="text-base sm:text-lg font-black tracking-tight drop-shadow-sm flex items-center justify-between">
            <span>{category.name}</span>
            <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center group-hover:bg-emerald-500 group-hover:translate-x-0.5 transition-all">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </div>
          </h3>
        </div>
      </div>

      <div className="p-3.5 flex flex-col justify-between flex-1 bg-white">
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {category.shortDesc}
        </p>
      </div>
    </Link>
  );
};
