import React from 'react';
import { Edit, Trash2, Eye, Package } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  onView
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktif';
      case 'inactive':
        return 'Pasif';
      case 'draft':
        return 'Taslak';
      default:
        return status;
    }
  };

  return (
    <div className="card-modern overflow-hidden group hover-lift animate-fade-in">
      <div className="relative">
        {product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-400 animate-pulse-soft" />
          </div>
        )}
        
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getStatusColor(product.status)} shadow-lg`}>
            {getStatusText(product.status)}
          </span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center space-x-3">
          <button
            onClick={() => onView(product)}
            className="bg-white/90 backdrop-blur-sm text-gray-700 p-3 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg hover-glow"
            title="Görüntüle"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => onEdit(product)}
            className="bg-white/90 backdrop-blur-sm text-blue-600 p-3 rounded-full hover:bg-blue-50 hover:scale-110 transition-all duration-300 shadow-lg hover-glow"
            title="Düzenle"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="bg-white/90 backdrop-blur-sm text-red-600 p-3 rounded-full hover:bg-red-50 hover:scale-110 transition-all duration-300 shadow-lg hover-glow"
            title="Sil"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-lg group-hover:text-blue-600 transition-colors duration-300">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-400' : product.stock > 0 ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
            <span>Stok: {product.stock}</span>
          </div>
          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">SKU: {product.sku}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {product.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 text-xs rounded-full border border-blue-100 hover:border-blue-200 transition-colors">
              {tag}
            </span>
          ))}
          {product.tags.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
              +{product.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};