import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { ProductForm } from '../components/ProductForm';
import { ProductFilters } from '../components/ProductFilters';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { Pagination } from '../components/Pagination';
import { Plus, Grid3X3, List } from 'lucide-react';
import { Product } from '../types/product';

const ProductsPage: React.FC = () => {
  const {
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
  } = useProducts();
  const [showForm, setShowForm] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Product | undefined>(undefined);
  const [viewingProduct, setViewingProduct] = React.useState<Product | undefined>(undefined);
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };
  const handleViewProduct = (product: Product) => {
    setViewingProduct(product);
  };
  const handleFormSubmit = (_product: Product) => {
    setShowForm(false);
    setEditingProduct(undefined);
    fetchProducts(currentPage);
  };
  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProduct(undefined);
  };
  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      await deleteProduct(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            title="Grid Görünümü"
          >
            <Grid3X3 size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            title="Liste Görünümü"
          >
            <List size={20} />
          </button>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-sm"
        >
          <Plus size={20} />
          <span>Yeni Ürün</span>
        </button>
      </div>
      <ProductFilters filters={filters} onFiltersChange={updateFilters} totalCount={totalCount} />
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <span className="text-gray-600">Ürünler yükleniyor...</span>
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <span className="text-red-600 mb-4">{error}</span>
          <button onClick={() => fetchProducts(1)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Tekrar Dene</button>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-gray-600 mb-4">Henüz ürün bulunmuyor</span>
          <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">İlk Ürünü Ekle</button>
        </div>
      ) : (
        <>
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                onView={handleViewProduct}
              />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
        </>
      )}
      {showForm && (
        <ProductForm product={editingProduct} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
      )}
      {viewingProduct && (
        <ProductDetailModal product={viewingProduct} onClose={() => setViewingProduct(undefined)} />
      )}
    </div>
  );
};

export default ProductsPage;
