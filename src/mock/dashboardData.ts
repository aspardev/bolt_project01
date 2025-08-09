import { InventoryAlert, ProductPerformance } from '../types/analytics';

export const mockDashboardStats = {
  totalRevenue: 1250000,
  revenueGrowth: 15.8,
  totalOrders: 3567,
  orderGrowth: 8.4,
  activeProducts: 432,
  totalProducts: 589,
  productGrowth: 5.2,
  lowStockProducts: 23,
  averageOrderValue: 350.43
};

export const mockSalesData = [
  { date: '2025-08-01', revenue: 42500, orders: 145, visitors: 2800 },
  { date: '2025-08-02', revenue: 38900, orders: 132, visitors: 2500 },
  { date: '2025-08-03', revenue: 45600, orders: 156, visitors: 3100 },
  { date: '2025-08-04', revenue: 39800, orders: 138, visitors: 2700 },
  { date: '2025-08-05', revenue: 47200, orders: 162, visitors: 3300 },
  { date: '2025-08-06', revenue: 44300, orders: 151, visitors: 3000 },
  { date: '2025-08-07', revenue: 49800, orders: 168, visitors: 3500 }
];

export const mockCategoryData = [
  { 
    category: 'Elektronik',
    revenue: 450000,
    orders: 890,
    products: 156,
    value: 35,
    growth: 12.5,
    name: 'Elektronik'
  },
  { 
    category: 'Giyim',
    revenue: 320000,
    orders: 1200,
    products: 245,
    value: 28,
    growth: 8.2,
    name: 'Giyim'
  },
  { 
    category: 'Ev & Yaşam',
    revenue: 280000,
    orders: 750,
    products: 189,
    value: 20,
    growth: 15.3,
    name: 'Ev & Yaşam'
  },
  { 
    category: 'Spor',
    revenue: 180000,
    orders: 450,
    products: 98,
    value: 12,
    growth: 6.8,
    name: 'Spor'
  },
  { 
    category: 'Kitap',
    revenue: 85000,
    orders: 380,
    products: 234,
    value: 5,
    growth: 4.2,
    name: 'Kitap'
  }
];

export const mockRevenueData = [
  { period: 'Bu Hafta', revenue: 325000, growth: 12.5, orders: 980 },
  { period: 'Geçen Hafta', revenue: 289000, growth: 8.2, orders: 890 },
  { period: 'Bu Ay', revenue: 1250000, growth: 15.3, orders: 3560 },
  { period: 'Geçen Ay', revenue: 1080000, growth: 6.8, orders: 3250 }
];

export const mockTopProducts = [
  {
    id: 'prod_01',
    name: 'iPhone 14 Pro',
    revenue: 6707844,
    orders: 156,
    views: 12500,
    conversionRate: 1.25,
    stock: 89,
    image: 'https://example.com/iphone14pro.jpg'
  },
  {
    id: 'prod_02',
    name: 'Samsung 4K Smart TV',
    revenue: 1567902,
    orders: 98,
    views: 8900,
    conversionRate: 1.1,
    stock: 45,
    image: 'https://example.com/samsungtv.jpg'
  },
  {
    id: 'prod_03',
    name: 'Nike Air Max',
    revenue: 808255,
    orders: 245,
    views: 15600,
    conversionRate: 1.57,
    stock: 120,
    image: 'https://example.com/nikeairmax.jpg'
  },
  {
    id: 'prod_04',
    name: 'Apple MacBook Pro',
    revenue: 4133922,
    orders: 78,
    views: 6500,
    conversionRate: 1.2,
    stock: 34,
    image: 'https://example.com/macbookpro.jpg'
  },
  {
    id: 'prod_05',
    name: 'Sony WH-1000XM4',
    revenue: 1417311,
    orders: 189,
    views: 11200,
    conversionRate: 1.69,
    stock: 67,
    image: 'https://example.com/sonywh1000xm4.jpg'
  }
];

export const mockInventoryAlerts: InventoryAlert[] = [
  {
    id: 'alert_01',
    productName: 'iPhone 14 Pro',
    currentStock: 5,
    minStock: 10,
    status: 'critical',
    image: 'https://example.com/iphone14pro.jpg'
  },
  {
    id: 'alert_02',
    productName: 'Samsung 4K Smart TV',
    currentStock: 8,
    minStock: 15,
    status: 'low',
    image: 'https://example.com/samsungtv.jpg'
  },
  {
    id: 'alert_03',
    productName: 'Apple MacBook Pro',
    currentStock: 3,
    minStock: 10,
    status: 'critical',
    image: 'https://example.com/macbookpro.jpg'
  }
];
