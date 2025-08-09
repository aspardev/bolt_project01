import React from 'react';
import { TrendingUp, TrendingDown, Eye, ShoppingCart, Package } from 'lucide-react';
import { ProductPerformance } from '../../types/analytics';

interface TopProductsTableProps {
  products: ProductPerformance[];
}

export const TopProductsTable: React.FC<TopProductsTableProps> = ({ products }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'text-red-600 bg-red-50', text: 'Tükendi' };
    if (stock < 10) return { color: 'text-orange-600 bg-orange-50', text: 'Az' };
    if (stock < 50) return { color: 'text-yellow-600 bg-yellow-50', text: 'Orta' };
    return { color: 'text-green-600 bg-green-50', text: 'Bol' };
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">En Çok Satan Ürünler</h3>
        <p className="text-sm text-gray-600">Performans bazında sıralanmış ürünler</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Ürün</th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">Gelir</th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">Sipariş</th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">Görüntüleme</th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">Dönüşüm</th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">Stok</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const stockStatus = getStockStatus(product.stock);
              
              return (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="absolute -top-1 -left-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                          {index + 1}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 line-clamp-1">{product.name}</p>
                        <p className="text-sm text-gray-500">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(product.revenue)}</p>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <ShoppingCart className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{product.orders.toLocaleString('tr-TR')}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{product.views.toLocaleString('tr-TR')}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      {product.conversionRate > 2 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`font-medium ${product.conversionRate > 2 ? 'text-green-600' : 'text-red-600'}`}>
                        %{product.conversionRate.toFixed(2)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                        {product.stock} ({stockStatus.text})
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};