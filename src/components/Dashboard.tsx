import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  ShoppingCart,
  Package,
  AlertTriangle,
  BarChart3,
  Loader2,
} from 'lucide-react';
import { StatsCard } from './dashboard/StatsCard';
import { SalesChart } from './dashboard/SalesChart';
import { CategoryChart } from './dashboard/CategoryChart';
import { TopProductsTable } from './dashboard/TopProductsTable';
import { InventoryAlerts } from './dashboard/InventoryAlerts';
import { RevenueMetrics } from './dashboard/RevenueMetrics';
import { analyticsService } from '../services/analyticsService';
import {
  DashboardStats,
  SalesData,
  CategoryPerformance,
  ProductPerformance,
  RevenueByPeriod,
  InventoryAlert,
} from '../types/analytics';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryPerformance[]>([]);
  const [topProducts, setTopProducts] = useState<ProductPerformance[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueByPeriod[]>([]);
  const [inventoryAlerts, setInventoryAlerts] = useState<InventoryAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [salesPeriod, setSalesPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [chartType, setChartType] = useState<'area' | 'line'>('area');

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    loadSalesData();
  }, [salesPeriod]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [
        statsData,
        salesResponse,
        categoryResponse,
        productsResponse,
        revenueResponse,
        alertsResponse,
      ] = await Promise.all([
        analyticsService.getDashboardStats(),
        analyticsService.getSalesData(salesPeriod),
        analyticsService.getCategoryPerformance(),
        analyticsService.getTopProducts(),
        analyticsService.getRevenueByPeriod(),
        analyticsService.getInventoryAlerts(),
      ]);

      setStats(statsData);
      setSalesData(salesResponse);
      setCategoryData(categoryResponse);
      setTopProducts(productsResponse);
      setRevenueData(revenueResponse);
      setInventoryAlerts(alertsResponse);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSalesData = async () => {
    try {
      const data = await analyticsService.getSalesData(salesPeriod);
      setSalesData(data);
    } catch (error) {
      console.error('Error loading sales data:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Dashboard yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">E-ticaret performans analizi ve raporlama</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={salesPeriod}
                onChange={(e) => setSalesPeriod(e.target.value as '7d' | '30d' | '90d')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Son 7 Gün</option>
                <option value="30d">Son 30 Gün</option>
                <option value="90d">Son 90 Gün</option>
              </select>
              <button
                onClick={loadDashboardData}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <BarChart3 size={16} />
                <span>Yenile</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Toplam Gelir"
              value={formatCurrency(stats.totalRevenue)}
              change={stats.revenueGrowth}
              icon={<DollarSign className="w-6 h-6" />}
              color="blue"
              subtitle={`${salesPeriod === '7d' ? 'Son 7 gün' : salesPeriod === '30d' ? 'Son 30 gün' : 'Son 90 gün'}`}
            />
            <StatsCard
              title="Toplam Sipariş"
              value={stats.totalOrders.toLocaleString('tr-TR')}
              change={stats.orderGrowth}
              icon={<ShoppingCart className="w-6 h-6" />}
              color="green"
              subtitle={`Ortalama: ${formatCurrency(stats.averageOrderValue)}`}
            />
            <StatsCard
              title="Aktif Ürünler"
              value={stats.activeProducts.toLocaleString('tr-TR')}
              change={stats.productGrowth}
              icon={<Package className="w-6 h-6" />}
              color="purple"
              subtitle={`Toplam: ${stats.totalProducts.toLocaleString('tr-TR')} ürün`}
            />
            <StatsCard
              title="Stok Uyarıları"
              value={stats.lowStockProducts}
              icon={<AlertTriangle className="w-6 h-6" />}
              color="orange"
              subtitle="Dikkat gerektiren ürünler"
            />
          </div>
        )}

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Satış Performansı</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setChartType('area')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    chartType === 'area'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Area
                </button>
                <button
                  onClick={() => setChartType('line')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    chartType === 'line'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Line
                </button>
              </div>
            </div>
            <SalesChart data={salesData} type={chartType} height={350} />
          </div>
        </div>

        {/* Category Performance and Revenue Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <CategoryChart data={categoryData} type="bar" height={300} />
          <RevenueMetrics data={revenueData} />
        </div>

        {/* Category Pie Chart and Inventory Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <CategoryChart data={categoryData} type="pie" height={300} />
          <InventoryAlerts 
            alerts={inventoryAlerts} 
            onRefresh={() => analyticsService.getInventoryAlerts().then(setInventoryAlerts)}
          />
        </div>

        {/* Top Products Table */}
        <div className="mb-8">
          <TopProductsTable products={topProducts} />
        </div>
      </div>
    </div>
  );
};