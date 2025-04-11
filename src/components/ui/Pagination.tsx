// src/components/ui/Pagination.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  const { t, dir } = useLanguage();
  
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;
  
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  // Create array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    
    // Always show first page
    pageNumbers.push(1);
    
    // Calculate start and end of page range around current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // If we're showing fewer than 3 pages, adjust to show more
    if (endPage - startPage < 2) {
      if (startPage === 2) {
        endPage = Math.min(4, totalPages - 1);
      } else if (endPage === totalPages - 1) {
        startPage = Math.max(2, totalPages - 3);
      }
    }
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pageNumbers.push(-1); // -1 represents ellipsis
    }
    
    // Add page numbers in range
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push(-2); // -2 represents ellipsis
    }
    
    // Always show last page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };
  
  const PrevIcon = dir === 'rtl' ? ChevronRight : ChevronLeft;
  const NextIcon = dir === 'rtl' ? ChevronLeft : ChevronRight;
  
  return (
    <nav className={`flex justify-center items-center space-x-1 rtl:space-x-reverse ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label={t('previousPage')}
      >
        <PrevIcon className="h-4 w-4" />
      </Button>
      
      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === -1 || page === -2 ? (
            <span className="w-9 h-9 flex items-center justify-center">...</span>
          ) : (
            <Button
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(page)}
              className="w-9 h-9"
            >
              {page}
            </Button>
          )}
        </React.Fragment>
      ))}
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label={t('nextPage')}
      >
        <NextIcon className="h-4 w-4" />
      </Button>
    </nav>
  );
};

export default Pagination;