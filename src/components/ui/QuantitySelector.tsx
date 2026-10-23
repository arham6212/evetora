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
    <div className="space-y-1.5">
      <div className="inline-flex items-center border border-brand-sand bg-white rounded-md overflow-hidden select-none shadow-xs">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          className={`text-brand-charcoal hover:bg-brand-sand-light active:bg-brand-sand disabled:opacity-30 transition-colors flex items-center justify-center font-bold ${
            isSm ? 'w-7 h-7' : 'w-9 h-9'
          }`}
          aria-label="Decrease quantity"
        >
          <Minus className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        </button>

        <input
          type="number"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          min={min}
          max={max}
          className={`text-center font-bold text-brand-charcoal focus:outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
            isSm ? 'w-12 text-xs py-1' : 'w-16 text-sm py-1.5'
          }`}
          aria-label="Quantity"
        />

        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          className={`text-brand-charcoal hover:bg-brand-sand-light active:bg-brand-sand disabled:opacity-30 transition-colors flex items-center justify-center font-bold ${
            isSm ? 'w-7 h-7' : 'w-9 h-9'
          }`}
          aria-label="Increase quantity"
        >
          <Plus className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        </button>
      </div>

      {bulkOptions && bulkOptions.length > 0 && (
        <div className="flex flex-wrap gap-1 items-center">
          <span className="text-[10px] text-brand-taupe font-medium mr-1">Quick Qty:</span>
          {bulkOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`text-[11px] px-2 py-0.5 rounded-xs border transition-colors font-medium ${
                value === opt
                  ? 'bg-brand-primary text-white border-brand-primary'
                  : 'bg-white hover:bg-brand-sand-light text-brand-charcoal border-brand-sand'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
