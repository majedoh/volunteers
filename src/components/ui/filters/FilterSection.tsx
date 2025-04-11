// src/components/ui/filters/FilterSection.tsx
import React from 'react';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';
import SearchInput from './SearchInput';
import FilterDropdown from './FilterDropdown';
import DateRangeFilter from './DateRangeFilter';

interface FilterSectionProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  location: string;
  onLocationChange: (value: string) => void;
  fromDate: string;
  onFromDateChange: (date: string) => void;
  toDate: string;
  onToDateChange: (date: string) => void;
  onReset: () => void;
  categoryOptions: Array<{ value: string; label: string }>;
  locationOptions: Array<{ value: string; label: string }>;
  className?: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  location,
  onLocationChange,
  fromDate,
  onFromDateChange,
  toDate,
  onToDateChange,
  onReset,
  categoryOptions,
  locationOptions,
  className = '',
}) => {
  const { t } = useLanguage();
  
  // Check if any filter is active
  const isFilterActive = search || category || location || fromDate || toDate;
  
  return (
    <div className={`bg-white rounded-lg border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          {t('filters')}
        </h2>
        {isFilterActive && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onReset}
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <X className="h-4 w-4 mr-1" />
            {t('clearFilters')}
          </Button>
        )}
      </div>
      
      <div className="space-y-6">
        <SearchInput 
          value={search}
          onChange={onSearchChange}
          placeholder={t('searchOpportunities')}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FilterDropdown 
            value={category}
            onChange={onCategoryChange}
            options={categoryOptions}
            label={t('category')}
            placeholder={t('allCategories')}
          />
          
          <FilterDropdown 
            value={location}
            onChange={onLocationChange}
            options={locationOptions}
            label={t('location')}
            placeholder={t('allLocations')}
          />
        </div>
        
        <DateRangeFilter 
          fromDate={fromDate}
          toDate={toDate}
          onFromDateChange={onFromDateChange}
          onToDateChange={onToDateChange}
        />
      </div>
    </div>
  );
};

export default FilterSection;