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
          <label className="text-xs uppercase tracking-wider font-bold text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            {label}
          </label>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            {days} {days === 1 ? 'Day Rental' : 'Days Rental'}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2 bg-slate-50 border border-slate-200 rounded-2xl">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-slate-400 block px-2 pt-1 font-bold">
            Delivery / Start Date
          </span>
          <input
            type="date"
            value={startDate}
            min={today}
            onChange={handleStartChange}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500 cursor-pointer shadow-2xs"
          />
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-wider text-slate-400 block px-2 pt-1 font-bold">
            Return / End Date
          </span>
          <input
            type="date"
            value={endDate}
            min={minEndDate}
            onChange={handleEndChange}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500 cursor-pointer shadow-2xs"
          />
        </div>
      </div>
    </div>
  );
};
