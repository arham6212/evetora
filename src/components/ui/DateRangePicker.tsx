import React from 'react';
import { Calendar } from 'lucide-react';
import { calculateDaysBetween, getNextDay } from '../../utils/formatters';

export interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onChange: (dates: { start: string; end: string }) => void;
  label?: string;
  className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange,
  label = 'Rental Event Dates',
  className = '',
}) => {
  const today = new Date().toISOString().split('T')[0];

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = e.target.value;
    if (!newStart) return;

    // If new start date is after or equal to end date, bump end date to day after start
    if (newStart >= endDate) {
      onChange({
        start: newStart,
        end: getNextDay(newStart),
      });
    } else {
      onChange({
        start: newStart,
        end: endDate,
      });
    }
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = e.target.value;
    if (!newEnd) return;

    if (newEnd <= startDate) {
      // Prevent end date preceding start date
      return;
    }

    onChange({
      start: startDate,
      end: newEnd,
    });
  };

  const days = calculateDaysBetween(startDate, endDate);
  const minEndDate = getNextDay(startDate);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs uppercase tracking-wider font-medium text-brand-charcoal/80 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-brand-olive" />
            {label}
          </label>
          <span className="text-[11px] font-medium text-brand-olive bg-brand-olive-soft px-2 py-0.5 rounded-xs">
            {days} {days === 1 ? 'Day Rental' : 'Days Rental'}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1.5 bg-brand-sand-light/60 border border-brand-sand rounded-xs">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-brand-charcoal/60 block px-2 pt-1 font-medium">
            Delivery / Start Date
          </span>
          <input
            type="date"
            value={startDate}
            min={today}
            onChange={handleStartChange}
            className="w-full bg-white border border-brand-sand/70 rounded-xs px-3 py-1.5 text-xs font-medium text-brand-charcoal focus:outline-none focus:border-brand-charcoal cursor-pointer"
          />
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-wider text-brand-charcoal/60 block px-2 pt-1 font-medium">
            Return / End Date
          </span>
          <input
            type="date"
            value={endDate}
            min={minEndDate}
            onChange={handleEndChange}
            className="w-full bg-white border border-brand-sand/70 rounded-xs px-3 py-1.5 text-xs font-medium text-brand-charcoal focus:outline-none focus:border-brand-charcoal cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
