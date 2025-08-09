import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { CategoryPerformance } from '../../types/analytics';

interface CategoryChartProps {
  data: CategoryPerformance[];
  type: 'bar' | 'pie';
  height?: number;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export const CategoryChart: React.FC<CategoryChartProps> = ({ 
  data, 
  type = 'bar',
  height = 300 
}) => {
  const formatTooltipValue = (value: number, name: string) => {
    if (name === 'revenue') {
      return [new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY'
      }).format(value), 'Gelir'];
    }
    if (name === 'orders') {
      return [value.toLocaleString('tr-TR'), 'Sipariş'];
    }
    return [value, name];
  };

  if (type === 'pie') {
    const pieData = data.map(item => ({
      name: item.category,
      value: item.revenue,
      orders: item.orders
    }));

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Kategori Dağılımı</h3>
          <p className="text-sm text-gray-600">Gelir bazında kategori performansı</p>
        </div>
        
        <div className="flex items-center">
          <ResponsiveContainer width="60%" height={height}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [
                  new Intl.NumberFormat('tr-TR', {
                    style: 'currency',
                    currency: 'TRY'
                  }).format(value),
                  'Gelir'
                ]}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="flex-1 space-y-3">
            {pieData.map((item, index) => (
              <div key={item.name} className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Intl.NumberFormat('tr-TR', {
                      style: 'currency',
                      currency: 'TRY'
                    }).format(item.value)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{item.orders}</p>
                  <p className="text-xs text-gray-500">sipariş</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Kategori Performansı</h3>
        <p className="text-sm text-gray-600">Kategori bazında gelir ve sipariş analizi</p>
      </div>
      
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="category" 
            stroke="#6B7280"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            yAxisId="revenue"
            orientation="left"
            stroke="#6B7280"
            fontSize={12}
            tickFormatter={(value) => `₺${(value / 1000).toFixed(0)}k`}
          />
          <YAxis 
            yAxisId="orders"
            orientation="right"
            stroke="#6B7280"
            fontSize={12}
          />
          <Tooltip 
            formatter={formatTooltipValue}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar 
            yAxisId="revenue"
            dataKey="revenue" 
            fill="#3B82F6" 
            radius={[4, 4, 0, 0]}
            name="revenue"
          />
          <Bar 
            yAxisId="orders"
            dataKey="orders" 
            fill="#10B981" 
            radius={[4, 4, 0, 0]}
            name="orders"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};