import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  subtitle?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
  color,
  subtitle
}) => {
  const colorClasses = {
    blue: 'bg-blue-500 text-blue-600 bg-blue-50',
    green: 'bg-green-500 text-green-600 bg-green-50',
    purple: 'bg-purple-500 text-purple-600 bg-purple-50',
    orange: 'bg-orange-500 text-orange-600 bg-orange-50',
    red: 'bg-red-500 text-red-600 bg-red-50'
  };

  const [bgColor, textColor, lightBg] = colorClasses[color].split(' ');

  const getTrendIcon = () => {
    if (change === undefined) return <Minus className="w-4 h-4" />;
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getTrendColor = () => {
    if (change === undefined) return 'text-gray-500';
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  return (
    <div className="card-modern p-6 hover-lift animate-scale-in group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${
          color === 'blue' ? 'from-blue-400 to-blue-600' :
          color === 'green' ? 'from-green-400 to-green-600' :
          color === 'purple' ? 'from-purple-400 to-purple-600' :
          color === 'orange' ? 'from-orange-400 to-orange-600' :
          'from-red-400 to-red-600'
        } shadow-lg group-hover:shadow-xl transition-all duration-300`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
        {change !== undefined && (
          <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
            change > 0 ? 'bg-green-100 text-green-700' :
            change < 0 ? 'bg-red-100 text-red-700' :
            'bg-gray-100 text-gray-700'
          } transition-all duration-300`}>
            {getTrendIcon()}
            <span className="text-sm font-medium">
              {change > 0 ? '+' : ''}{Math.abs(change)}%
            </span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors">{title}</h3>
        <p className="text-3xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">{value}</p>
        {subtitle && (
          <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">{subtitle}</p>
        )}
      </div>
      
      {/* Decorative gradient line */}
      <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${
        color === 'blue' ? 'from-blue-400 to-blue-600' :
        color === 'green' ? 'from-green-400 to-green-600' :
        color === 'purple' ? 'from-purple-400 to-purple-600' :
        color === 'orange' ? 'from-orange-400 to-orange-600' :
        'from-red-400 to-red-600'
      } opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
    </div>
  );
};