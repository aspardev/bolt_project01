import React from 'react';

interface SplashScreenProps {
  progress?: number;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ progress = 80 }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      {/* Animated background particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      <div className="flex flex-col items-center mb-12 animate-bounce-in">
        <div className="relative mb-6">
          <div className="w-32 h-32 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl flex items-center justify-center glass-strong animate-float">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 3L4 14h7v7l9-11h-7V3z"/>
              </svg>
            </div>
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse-soft"></div>
        </div>
        <h1 className="text-5xl font-bold text-white mb-3 animate-gradient bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
          E-Commerce Platform
        </h1>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg text-white/80 font-medium">v2.0.0</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <p className="text-white/70 text-center max-w-md">
          Modern ürün katalog yönetim sistemi
        </p>
      </div>
      
      <div className="w-full max-w-md animate-slide-up">
        <div className="relative">
          <div className="w-full bg-white/20 rounded-full h-4 mb-6 glass">
            <div 
              className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500 ease-out relative overflow-hidden" 
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between text-sm text-white/60 mb-4">
            <span>Başlatılıyor...</span>
            <span>{progress}%</span>
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-white font-medium">Platform hazırlanıyor...</p>
          <p className="text-white/60 text-sm">Güvenli ve hızlı deneyim için sistem başlatılıyor</p>
        </div>
        
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-white/40 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
