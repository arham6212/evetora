import { siteConfig } from '../data/siteConfig';

export const formatPrice = (amount: number): string => {
  return `${siteConfig.currency.symbol}${amount.toLocaleString('en-IN', {
    maximumFractionDigits: 0,
  })}`;
};

export const formatDateDisplay = (dateString: string): string => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-').map(Number);
  if (!year || !month || !day) return dateString;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const calculateDaysBetween = (startDate: string, endDate: string): number => {
  if (!startDate || !endDate) return 1;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
};

export const getNextDay = (dateString?: string): string => {
  const base = dateString ? new Date(dateString) : new Date();
  base.setDate(base.getDate() + 1);
  return base.toISOString().split('T')[0];
};

export const getDefaultRentalDates = (): { start: string; end: string } => {
  const start = new Date();
  start.setDate(start.getDate() + 3); // 3 days out by default
  const end = new Date(start);
  end.setDate(end.getDate() + 1); // 1-day rental standard for local parties
  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0],
  };
};
