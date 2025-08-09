import React, { useState } from 'react';
import { X } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { TwoFactorForm } from './TwoFactorForm';
import { useAuthContext } from '../../hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

type AuthMode = 'login' | 'register' | 'forgot-password' | 'two-factor';

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  initialMode = 'login' 
}) => {
  const { requiresTwoFactor, clearTwoFactor } = useAuthContext();
  const [mode, setMode] = useState<AuthMode>(initialMode);

  React.useEffect(() => {
    if (requiresTwoFactor) {
      setMode('two-factor');
    }
  }, [requiresTwoFactor]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    clearTwoFactor();
    setMode('login');
    onClose();
  };

  const handleBackFromTwoFactor = () => {
    clearTwoFactor();
    setMode('login');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {mode === 'login' && (
            <LoginForm
              onSwitchToRegister={() => setMode('register')}
              onSwitchToForgotPassword={() => setMode('forgot-password')}
            />
          )}
          
          {mode === 'register' && (
            <RegisterForm
              onSwitchToLogin={() => setMode('login')}
            />
          )}
          
          {mode === 'forgot-password' && (
            <ForgotPasswordForm
              onBack={() => setMode('login')}
            />
          )}
          
          {mode === 'two-factor' && (
            <TwoFactorForm
              onBack={handleBackFromTwoFactor}
            />
          )}
        </div>
      </div>
    </div>
  );
};