import React, { useState, useMemo } from 'react';
import { BarChart3, DollarSign, ShoppingCart, Package, AlertTriangle } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { SalesChart } from '../components/dashboard/SalesChart';
import { CategoryChart } from '../components/dashboard/CategoryChart';
import { TopProductsTable } from '../components/dashboard/TopProductsTable';
import { InventoryAlerts } from '../components/dashboard/InventoryAlerts';
import { RevenueMetrics } from '../components/dashboard/RevenueMetrics';

import {
  mockDashboardStats,
  mockSalesData,
  mockCategoryData,
  mockRevenueData,
  mockTopProducts,
  mockInventoryAlerts
} from '../mock/dashboardData';
import { SalesData, CategoryPerformance, ProductPerformance, RevenueByPeriod, InventoryAlert } from '../types/analytics';

const DashboardPage: React.FC = () => {
  const [salesPeriod, setSalesPeriod] = useState<'7d' | '30d' | '90d'>('7d');
  const [chartType, setChartType] = useState<'area' | 'line'>('area');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtreleme ve hesaplama fonksiyonları
  const filteredSalesData = useMemo(() => {
    const endDate = new Date();
    const startDate = new Date();
    
    switch (salesPeriod) {
      case '7d':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(endDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(endDate.getDate() - 90);
        break;
    }

    return mockSalesData.filter(data => {
      const date = new Date(data.date);
      return date >= startDate && date <= endDate;
    });
  }, [salesPeriod]);

  const filteredProducts = useMemo(() => {
    return mockTopProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="glass-strong border-b border-white/20 shadow-lg animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <div className="flex items-center space-x-4 animate-fade-in">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-1">Dashboard</h1>
                  <p className="text-white/80">Satış ve performans metrikleri</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={salesPeriod}
                onChange={(e) => setSalesPeriod(e.target.value as '7d' | '30d' | '90d')}
                className="input-modern px-4 py-2 text-sm font-medium"
              >
                <option value="7d">Son 7 Gün</option>
                <option value="30d">Son 30 Gün</option>
                <option value="90d">Son 90 Gün</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
          <StatsCard
            title="Toplam Gelir"
            value={formatCurrency(mockDashboardStats.totalRevenue)}
            change={mockDashboardStats.revenueGrowth}
            icon={<DollarSign className="w-6 h-6" />}
            color="blue"
            subtitle={`${salesPeriod === '7d' ? 'Son 7 gün' : salesPeriod === '30d' ? 'Son 30 gün' : 'Son 90 gün'}`}
          />
          <StatsCard
            title="Toplam Sipariş"
            value={mockDashboardStats.totalOrders.toLocaleString('tr-TR')}
            change={mockDashboardStats.orderGrowth}
            icon={<ShoppingCart className="w-6 h-6" />}
            color="green"
            subtitle={`Ortalama: ${formatCurrency(mockDashboardStats.averageOrderValue)}`}
          />
          <StatsCard
            title="Aktif Ürünler"
            value={mockDashboardStats.activeProducts.toLocaleString('tr-TR')}
            change={mockDashboardStats.productGrowth}
            icon={<Package className="w-6 h-6" />}
            color="purple"
            subtitle={`Toplam: ${mockDashboardStats.totalProducts.toLocaleString('tr-TR')} ürün`}
          />
          <StatsCard
            title="Stok Uyarıları"
            value={mockDashboardStats.lowStockProducts}
            icon={<AlertTriangle className="w-6 h-6" />}
            color="orange"
            subtitle="Dikkat gerektiren ürünler"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-slide-up">
          <div className="lg:col-span-2">
            <div className="card-modern p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Satış Performansı</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setChartType('area')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    chartType === 'area'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                  }`}
                >
                  Area
                </button>
                <button
                  onClick={() => setChartType('line')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    chartType === 'line'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                  }`}
                >
                  Line
                </button>
              </div>
            </div>
            <SalesChart data={filteredSalesData} type={chartType} height={350} />
            </div>
          </div>
        </div>

        {/* Category Performance and Revenue Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-slide-up">
          <div className="card-modern p-6 hover-lift">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Kategori Performansı</h3>
            <CategoryChart data={mockCategoryData} type="bar" height={300} />
          </div>
          <div className="card-modern p-6 hover-lift">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Gelir Metrikleri</h3>
            <RevenueMetrics data={mockRevenueData} />
          </div>
        </div>

        {/* Category Pie Chart and Inventory Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-slide-up">
          <div className="card-modern p-6 hover-lift">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Kategori Dağılımı</h3>
            <CategoryChart data={mockCategoryData} type="pie" height={300} />
          </div>
          <div className="card-modern p-6 hover-lift">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Stok Uyarıları</h3>
            <InventoryAlerts
              alerts={mockInventoryAlerts}
              onRefresh={() => console.log('Refreshing inventory alerts...')}
            />
          </div>
        </div>

        {/* Top Products Table */}
        <div className="card-modern p-6 mb-8 hover-lift animate-slide-up">
          <h3 className="text-xl font-bold text-gray-900 mb-6">En Çok Satan Ürünler</h3>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">En Çok Satan Ürünler</h3>
              <input
                type="text"
                placeholder="Ürün ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-modern px-4 py-2"
              />
            </div>
            <TopProductsTable products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
