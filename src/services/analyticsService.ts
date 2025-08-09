import { DashboardStats, SalesData, CategoryPerformance, ProductPerformance, RevenueByPeriod, TopCustomer, InventoryAlert } from '../types/analytics';
import { subDays, format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

class AnalyticsService {
  // Mock data generation for demo purposes
  private generateMockSalesData(days: number): SalesData[] {
    const data: SalesData[] = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(today, i);
      const baseRevenue = 15000 + Math.random() * 10000;
      const seasonalMultiplier = 1 + Math.sin((i / 30) * Math.PI) * 0.3;
      
      data.push({
        date: format(date, 'yyyy-MM-dd'),
        revenue: Math.round(baseRevenue * seasonalMultiplier),
        orders: Math.round((baseRevenue * seasonalMultiplier) / 150 + Math.random() * 20),
        visitors: Math.round((baseRevenue * seasonalMultiplier) / 25 + Math.random() * 100)
      });
    }
    
    return data;
  }

  async getDashboardStats(): Promise<DashboardStats> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const salesData = this.generateMockSalesData(30);
    const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0);
    const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0);
    
    const previousMonthRevenue = totalRevenue * (0.85 + Math.random() * 0.2);
    const previousMonthOrders = totalOrders * (0.9 + Math.random() * 0.15);
    
    return {
      totalProducts: 1247,
      totalRevenue,
      totalOrders,
      averageOrderValue: Math.round(totalRevenue / totalOrders),
      activeProducts: 1189,
      lowStockProducts: 23,
      topSellingProducts: [], // Will be populated separately
      revenueGrowth: Math.round(((totalRevenue - previousMonthRevenue) / previousMonthRevenue) * 100),
      orderGrowth: Math.round(((totalOrders - previousMonthOrders) / previousMonthOrders) * 100),
      productGrowth: 8.5
    };
  }

  async getSalesData(period: '7d' | '30d' | '90d' = '30d'): Promise<SalesData[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    return this.generateMockSalesData(days);
  }

  async getCategoryPerformance(): Promise<CategoryPerformance[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return [
      {
        category: 'Elektronik',
        revenue: 245680,
        orders: 1456,
        products: 234,
        growth: 12.5
      },
      {
        category: 'Moda & Giyim',
        revenue: 189340,
        orders: 2341,
        products: 567,
        growth: 8.2
      },
      {
        category: 'Ev & Yaşam',
        revenue: 156720,
        orders: 1876,
        products: 345,
        growth: -2.1
      },
      {
        category: 'Gıda & İçecek',
        revenue: 98450,
        orders: 3245,
        products: 123,
        growth: 15.7
      },
      {
        category: 'Spor & Outdoor',
        revenue: 87320,
        orders: 987,
        products: 189,
        growth: 6.8
      }
    ];
  }

  async getTopProducts(): Promise<ProductPerformance[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return [
      {
        id: '1',
        name: 'Premium Kahve Makinesi',
        revenue: 45680,
        orders: 234,
        views: 12450,
        conversionRate: 1.88,
        stock: 15,
        image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: '2',
        name: 'Wireless Bluetooth Kulaklık',
        revenue: 38920,
        orders: 456,
        views: 18760,
        conversionRate: 2.43,
        stock: 32,
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: '3',
        name: 'Organik Yeşil Çay',
        revenue: 12340,
        orders: 789,
        views: 8920,
        conversionRate: 8.84,
        stock: 120,
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: '4',
        name: 'Smart Watch Pro',
        revenue: 67890,
        orders: 123,
        views: 15670,
        conversionRate: 0.78,
        stock: 8,
        image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: '5',
        name: 'Yoga Matı Premium',
        revenue: 23450,
        orders: 345,
        views: 9870,
        conversionRate: 3.49,
        stock: 67,
        image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ];
  }

  async getRevenueByPeriod(): Promise<RevenueByPeriod[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'];
    return months.map((month, index) => ({
      period: month,
      revenue: 180000 + (Math.random() * 80000) + (index * 5000),
      orders: 1200 + (Math.random() * 400) + (index * 50),
      growth: -5 + (Math.random() * 20)
    }));
  }

  async getTopCustomers(): Promise<TopCustomer[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return [
      {
        id: '1',
        name: 'Ahmet Yılmaz',
        email: 'ahmet@example.com',
        totalOrders: 23,
        totalSpent: 12450,
        lastOrder: '2024-01-15'
      },
      {
        id: '2',
        name: 'Fatma Kaya',
        email: 'fatma@example.com',
        totalOrders: 18,
        totalSpent: 9870,
        lastOrder: '2024-01-14'
      },
      {
        id: '3',
        name: 'Mehmet Demir',
        email: 'mehmet@example.com',
        totalOrders: 15,
        totalSpent: 8920,
        lastOrder: '2024-01-13'
      }
    ];
  }

  async getInventoryAlerts(): Promise<InventoryAlert[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return [
      {
        id: '1',
        productName: 'Smart Watch Pro',
        currentStock: 3,
        minStock: 10,
        status: 'critical',
        image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: '2',
        productName: 'Premium Kahve Makinesi',
        currentStock: 8,
        minStock: 15,
        status: 'low',
        image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: '3',
        productName: 'Bluetooth Speaker',
        currentStock: 0,
        minStock: 20,
        status: 'out',
        image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ];
  }
}

export const analyticsService = new AnalyticsService();