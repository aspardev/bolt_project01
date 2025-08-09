export interface DashboardStats {
  totalProducts: number;
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  activeProducts: number;
  lowStockProducts: number;
  topSellingProducts: Product[];
  revenueGrowth: number;
  orderGrowth: number;
  productGrowth: number;
}

export interface SalesData {
  date: string;
  revenue: number;
  orders: number;
  visitors: number;
}

export interface CategoryPerformance {
  category: string;
  revenue: number;
  orders: number;
  products: number;
  growth: number;
}

export interface ProductPerformance {
  id: string;
  name: string;
  revenue: number;
  orders: number;
  views: number;
  conversionRate: number;
  stock: number;
  image: string;
}

export interface RevenueByPeriod {
  period: string;
  revenue: number;
  orders: number;
  growth: number;
}

export interface TopCustomer {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
}

export interface InventoryAlert {
  id: string;
  productName: string;
  currentStock: number;
  minStock: number;
  status: 'low' | 'out' | 'critical';
  image: string;
}

import { Product } from './product';