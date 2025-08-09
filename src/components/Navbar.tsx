import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Package2, User } from 'lucide-react';

const Navbar: React.FC<{ onProfileClick: () => void }> = ({ onProfileClick }) => {
  const location = useLocation();
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex space-x-4">
          <Link
            to="/dashboard"
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${location.pathname === '/dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
          >
            <BarChart3 size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/products"
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${location.pathname === '/products' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
          >
            <Package2 size={20} />
            <span>Ürünler</span>
          </Link>
        </div>
        <button
          onClick={onProfileClick}
          className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <User className="w-5 h-5" />
          <span>Profil</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
