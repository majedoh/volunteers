// src/components/ui/filters/SearchInput.tsx
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
  className = '',
}) => {
  const { t, dir } = useLanguage();
  const [inputValue, setInputValue] = useState(value);
  
  // Debounce search input
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onChange(inputValue);
    }, 300);
    
    return () => clearTimeout(debounceTimer);
  }, [inputValue, onChange]);
  
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full p-4 ps-10 text-sm border rounded-lg bg-white focus:ring-accent focus:border-accent"
        placeholder={placeholder || t('searchPlaceholder')}
        dir={dir}
      />
    </div>
  );
};

export default SearchInput;