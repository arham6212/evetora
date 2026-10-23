import React from 'react';
import { Minus, Plus } from 'lucide-react';

export interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  step?: number;
  bulkOptions?: number[];
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  onChange,
  min = 1,
  max = 9999,
  size = 'md',
  step = 1,
  bulkOptions,
}) => {
  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = value - step;
    if (next >= min) {
      onChange(next);
    } else if (value > min) {
      onChange(min);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = value + step;
    if (next <= max) {
      onChange(next);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) return;
    if (val >= 0 && val <= max) {
      onChange(val);
    }
  };

  const handleBlur = () => {
    if (value < min) {
      onChange(min);
    }
  };

  const isSm = size === 'sm';

  return (
    <div className="space-y-2">
      <div className="inline-flex items-center border border-slate-200 bg-white rounded-xl overflow-hidden select-none shadow-2xs">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          className={`text-slate-700 hover:bg-slate-100 active:bg-slate-200 disabled:opacity-30 transition-colors flex items-center justify-center font-bold ${
            isSm ? 'w-8 h-8' : 'w-10 h-10'
          }`}
          aria-label="Decrease quantity"
        >
          <Minus className={isSm ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
        </button>

        <input
          type="number"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          min={min}
          max={max}
          className={`text-center font-black text-slate-900 focus:outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
            isSm ? 'w-12 text-xs py-1' : 'w-16 text-sm py-2'
          }`}
          aria-label="Quantity"
        />

        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          className={`text-slate-700 hover:bg-slate-100 active:bg-slate-200 disabled:opacity-30 transition-colors flex items-center justify-center font-bold ${
            isSm ? 'w-8 h-8' : 'w-10 h-10'
          }`}
          aria-label="Increase quantity"
        >
          <Plus className={isSm ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
        </button>
      </div>

      {bulkOptions && bulkOptions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mr-1">Quick:</span>
          {bulkOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`text-xs px-2.5 py-1 rounded-lg border transition-all font-bold ${
                value === opt
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              +{opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
