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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div className="flex glass rounded-2xl p-2 shadow-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-3 rounded-xl transition-all duration-300 ${
              viewMode === 'grid' 
                ? 'bg-white/90 shadow-lg text-blue-600 scale-105' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            title="Grid Görünümü"
          >
            <Grid3X3 size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-3 rounded-xl transition-all duration-300 ${
              viewMode === 'list' 
                ? 'bg-white/90 shadow-lg text-blue-600 scale-105' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            title="Liste Görünümü"
          >
            <List size={20} />
          </button>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-gradient px-8 py-4 rounded-2xl flex items-center space-x-3 shadow-lg hover-lift text-lg font-semibold"
        >
          <Plus size={20} />
          <span>Yeni Ürün</span>
        </button>
      </div>
      <ProductFilters filters={filters} onFiltersChange={updateFilters} totalCount={totalCount} />
      {loading ? (
        <div className="flex items-center justify-center py-20 animate-fade-in">
          <div className="text-center">
            <div className="spinner mx-auto mb-4"></div>
            <span className="text-white/80 text-lg">Ürünler yükleniyor...</span>
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-20 animate-fade-in">
          <div className="card-modern p-8 max-w-md mx-auto">
            <span className="text-red-600 mb-6 block text-lg">{error}</span>
            <button 
              onClick={() => fetchProducts(1)} 
              className="btn-gradient px-6 py-3 rounded-xl hover-lift"
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 animate-fade-in">
          <div className="card-modern p-12 max-w-lg mx-auto">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Henüz ürün bulunmuyor</h3>
            <p className="text-gray-600 mb-8">İlk ürününüzü ekleyerek başlayın</p>
            <button 
              onClick={() => setShowForm(true)} 
              className="btn-gradient px-8 py-4 rounded-2xl hover-lift text-lg font-semibold"
            >
              İlk Ürünü Ekle
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={`animate-slide-up ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}`}>
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
