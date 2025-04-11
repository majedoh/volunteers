// src/components/ui/filters/DateRangeFilter.tsx
import React from 'react';
import { useLanguage } from '@/context/language-context';

interface DateRangeFilterProps {
  fromDate: string;
  toDate: string;
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
  fromLabel?: string;
  toLabel?: string;
  className?: string;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  fromLabel,
  toLabel,
  className = '',
}) => {
  const { t, dir } = useLanguage();
  
  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {fromLabel || t('fromDate')}
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => onFromDateChange(e.target.value)}
            className="w-full p-3 border rounded-lg bg-white focus:ring-accent focus:border-accent"
            dir="ltr" // Date inputs are always LTR
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            {toLabel || t('toDate')}
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => onToDateChange(e.target.value)}
            className="w-full p-3 border rounded-lg bg-white focus:ring-accent focus:border-accent"
            dir="ltr" // Date inputs are always LTR
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangeFilter;