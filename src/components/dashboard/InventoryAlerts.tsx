import React from 'react';
import { AlertTriangle, Package, RefreshCw } from 'lucide-react';
import { InventoryAlert } from '../../types/analytics';

interface InventoryAlertsProps {
  alerts: InventoryAlert[];
  onRefresh?: () => void;
}

export const InventoryAlerts: React.FC<InventoryAlertsProps> = ({ alerts, onRefresh }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'critical':
        return {
          color: 'text-red-600 bg-red-50 border-red-200',
          icon: <AlertTriangle className="w-4 h-4" />,
          text: 'Kritik'
        };
      case 'low':
        return {
          color: 'text-orange-600 bg-orange-50 border-orange-200',
          icon: <Package className="w-4 h-4" />,
          text: 'Düşük'
        };
      case 'out':
        return {
          color: 'text-red-600 bg-red-50 border-red-200',
          icon: <AlertTriangle className="w-4 h-4" />,
          text: 'Tükendi'
        };
      default:
        return {
          color: 'text-gray-600 bg-gray-50 border-gray-200',
          icon: <Package className="w-4 h-4" />,
          text: 'Normal'
        };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Stok Uyarıları</h3>
          <p className="text-sm text-gray-600">Dikkat gerektiren ürünler</p>
        </div>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Yenile"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Stok uyarısı bulunmuyor</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const statusConfig = getStatusConfig(alert.status);
            
            return (
              <div
                key={alert.id}
                className={`flex items-center space-x-4 p-4 rounded-lg border ${statusConfig.color}`}
              >
                <img
                  src={alert.image}
                  alt={alert.productName}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{alert.productName}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Mevcut: {alert.currentStock}</span>
                    <span>Min: {alert.minStock}</span>
                  </div>
                </div>
                
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${statusConfig.color}`}>
                  {statusConfig.icon}
                  <span className="text-sm font-medium">{statusConfig.text}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {alerts.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Tüm Uyarıları Görüntüle
          </button>
        </div>
      )}
    </div>
  );
};