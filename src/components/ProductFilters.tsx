import React, { useState, useEffect } from 'react';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { ProductFilters as FilterType } from '../types/product';
import { categoryService } from '../services/categoryService';

interface ProductFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  totalCount: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  totalCount
}) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchInput, setSearchInput] = useState(filters.search || '');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFiltersChange({
        ...filters,
        search: searchInput || undefined
      });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      ...filters,
      category: category || undefined
    });
  };

  const handleStatusChange = (status: string) => {
    onFiltersChange({
      ...filters,
      status: status || undefined
    });
  };

  const handleSortChange = (sortBy: string, sortOrder: string) => {
    onFiltersChange({
      ...filters,
      sortBy: sortBy as any,
      sortOrder: sortOrder as 'asc' | 'desc'
    });
  };

  const clearFilters = () => {
    setSearchInput('');
    onFiltersChange({});
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="card-modern p-6 mb-8 animate-slide-up">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="input-modern pl-12 pr-4 py-3 w-full text-lg"
            />
          </div>

          <select
            value={filters.category || ''}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="input-modern px-4 py-3 font-medium"
          >
            <option value="">Tüm Kategoriler</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name} ({category.productCount})
              </option>
            ))}
          </select>

          <select
            value={filters.status || ''}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="input-modern px-4 py-3 font-medium"
          >
            <option value="">Tüm Durumlar</option>
            <option value="active">Aktif</option>
            <option value="inactive">Pasif</option>
            <option value="draft">Taslak</option>
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300 hover-lift font-medium"
          >
            <SlidersHorizontal size={16} />
            <span>Gelişmiş</span>
          </button>

          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover-lift font-medium"
            >
              <X size={16} />
              <span>Temizle ({activeFilterCount})</span>
            </button>
          )}

          <div className="text-sm text-gray-500 font-medium px-3 py-2 bg-gray-50 rounded-xl">
            {totalCount} ürün bulundu
          </div>
        </div>
      </div>

      {showAdvanced && (
        <div className="mt-6 pt-6 border-t border-gray-200 animate-slide-down">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Sıralama
              </label>
              <select
                value={`${filters.sortBy || 'createdAt'}-${filters.sortOrder || 'desc'}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  handleSortChange(sortBy, sortOrder);
                }}
                className="input-modern w-full px-4 py-3 font-medium"
              >
                <option value="createdAt-desc">En Yeni</option>
                <option value="createdAt-asc">En Eski</option>
                <option value="name-asc">İsim (A-Z)</option>
                <option value="name-desc">İsim (Z-A)</option>
                <option value="price-asc">Fiyat (Düşük-Yüksek)</option>
                <option value="price-desc">Fiyat (Yüksek-Düşük)</option>
                <option value="stock-asc">Stok (Az-Çok)</option>
                <option value="stock-desc">Stok (Çok-Az)</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};