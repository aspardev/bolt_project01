import React from 'react';
import { Calendar, TrendingUp, DollarSign, Users } from 'lucide-react';
import { RevenueByPeriod } from '../../types/analytics';

interface RevenueMetricsProps {
  data: RevenueByPeriod[];
}

export const RevenueMetrics: React.FC<RevenueMetricsProps> = ({ data }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);
  const averageGrowth = data.reduce((sum, item) => sum + item.growth, 0) / data.length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Gelir Metrikleri</h3>
        <p className="text-sm text-gray-600">Son 6 aylık performans özeti</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
          <p className="text-sm text-gray-600">Toplam Gelir</p>
        </div>
        
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{totalOrders.toLocaleString('tr-TR')}</p>
          <p className="text-sm text-gray-600">Toplam Sipariş</p>
        </div>
        
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">%{averageGrowth.toFixed(1)}</p>
          <p className="text-sm text-gray-600">Ortalama Büyüme</p>
        </div>
      </div>

      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="font-medium text-gray-900">{item.period}</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="font-semibold text-gray-900">{formatCurrency(item.revenue)}</p>
                <p className="text-sm text-gray-500">{item.orders} sipariş</p>
              </div>
              
              <div className={`flex items-center space-x-1 ${
                item.growth >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className={`w-4 h-4 ${item.growth < 0 ? 'rotate-180' : ''}`} />
                <span className="text-sm font-medium">%{Math.abs(item.growth).toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};