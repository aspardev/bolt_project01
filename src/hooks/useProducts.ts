import { useState, useEffect, useCallback } from 'react';
import { Product, ProductFilters } from '../types/product';
import { productService } from '../services/productService';

export const useProducts = (initialFilters: ProductFilters = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);

  const fetchProducts = useCallback(async (page = 1, newFilters?: ProductFilters) => {
    setLoading(true);
    setError(null);

    try {
      const filtersToUse = newFilters || filters;
      const response = await productService.getProducts(filtersToUse, page, 12);
      
      setProducts(response.products);
      setTotalCount(response.totalCount);
      setCurrentPage(response.page);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError('Ürünler yüklenirken hata oluştu');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const updateFilters = (newFilters: ProductFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    fetchProducts(1, newFilters);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    fetchProducts(page);
  };

  const deleteProduct = async (id: string) => {
    try {
      await productService.deleteProduct(id);
      fetchProducts(currentPage); // Refresh current page
    } catch (err) {
      setError('Ürün silinirken hata oluştu');
      console.error('Error deleting product:', err);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  return {
    products,
    loading,
    error,
    totalCount,
    currentPage,
    totalPages,
    filters,
    fetchProducts,
    updateFilters,
    goToPage,
    deleteProduct
  };
};