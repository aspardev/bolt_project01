import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Package2, User } from 'lucide-react';

const Navbar: React.FC<{ onProfileClick: () => void }> = ({ onProfileClick }) => {
  const location = useLocation();
  return (
    <nav className="glass-strong border-b border-white/20 shadow-lg animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-18">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 3L4 14h7v7l9-11h-7V3z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-white">E-Commerce</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Link
            to="/dashboard"
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover-lift ${
              location.pathname === '/dashboard' 
                ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <BarChart3 size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/products"
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover-lift ${
              location.pathname === '/products' 
                ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <Package2 size={20} />
            <span>Ürünler</span>
          </Link>
        </div>
        
        <button
          onClick={onProfileClick}
          className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 hover-lift"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-600 rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="hidden sm:block">Profil</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
