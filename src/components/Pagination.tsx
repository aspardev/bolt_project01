import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift('...');
    }
    if (currentPage + delta < totalPages - 1) {
      range.push('...');
    }

    range.unshift(1);
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center space-x-2 mt-12 animate-fade-in">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-3 rounded-xl glass hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover-lift text-white"
      >
        <ChevronLeft size={20} />
      </button>

      {visiblePages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
            page === currentPage
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-110'
              : page === '...'
              ? 'glass text-white/60 cursor-default'
              : 'glass text-white hover:bg-white/20 hover-lift'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-3 rounded-xl glass hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover-lift text-white"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};