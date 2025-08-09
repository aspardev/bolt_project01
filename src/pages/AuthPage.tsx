import React from 'react';
import { AuthModal } from '../components/auth/AuthModal';
import { useState } from 'react';
import { RegisterForm } from '../components/auth/RegisterForm';
import { useAuthContext } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          {showLogin ? 'Giriş Yap' : 'Kayıt Ol'}
        </h2>
        {showLogin ? (
          <AuthModal isOpen={true} onClose={() => {}} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setShowLogin(true)} />
        )}
        <div className="mt-6 text-center">
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setShowLogin(!showLogin)}
          >
            {showLogin ? 'Hesabınız yok mu? Kayıt Olun' : 'Zaten hesabınız var mı? Giriş Yapın'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
