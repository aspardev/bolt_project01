import React from 'react';

interface SplashScreenProps {
  progress?: number;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ progress = 80 }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="flex flex-col items-center mb-8">
        <img src="/logo.png" alt="Platform Logo" className="w-24 h-24 mb-4" />
        <h1 className="text-4xl font-bold text-blue-800 mb-2">Bolt Platform</h1>
        <span className="text-sm text-blue-600">v1.0.0</span>
      </div>
      <div className="w-full max-w-xs">
        <div className="w-full bg-blue-200 rounded-full h-3 mb-4">
          <div className="bg-blue-600 h-3 rounded-full animate-pulse" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-center text-blue-700 font-medium">Platform hazırlanıyor, lütfen bekleyin...</p>
        <p className="text-center text-blue-500 text-xs mt-2">Güvenli ve hızlı bir deneyim için sistem başlatılıyor.</p>
      </div>
    </div>
  );
};

export default SplashScreen;
