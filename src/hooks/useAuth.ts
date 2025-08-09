import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { AuthState, User, LoginCredentials, TwoFactorVerification, RegisterData } from '../types/auth';
import { authService } from '../services/authService';

const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  requiresTwoFactor: false
};

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  const setLoading = (isLoading: boolean) => {
    setAuthState(prev => ({ ...prev, isLoading }));
  };

  const setError = (error: string | null) => {
    setAuthState(prev => ({ ...prev, error }));
  };

  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const result = await authService.login(credentials);
      
      if (result.requiresTwoFactor) {
        setAuthState(prev => ({
          ...prev,
          requiresTwoFactor: true,
          tempToken: result.tempToken,
          isLoading: false
        }));
      } else {
        setAuthState(prev => ({
          ...prev,
          user: result.user,
          isAuthenticated: true,
          requiresTwoFactor: false,
          tempToken: undefined,
          isLoading: false
        }));
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Giriş yapılırken hata oluştu');
      setLoading(false);
    }
  }, []);

  const verifyTwoFactor = useCallback(async (verification: TwoFactorVerification) => {
    setLoading(true);
    setError(null);

    try {
      const result = await authService.verifyTwoFactor(verification);
      setAuthState(prev => ({
        ...prev,
        user: result.user,
        isAuthenticated: true,
        requiresTwoFactor: false,
        tempToken: undefined,
        isLoading: false
      }));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Doğrulama kodu geçersiz');
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await authService.register(data);
      setAuthState(prev => ({
        ...prev,
        user: result.user,
        isAuthenticated: true,
        isLoading: false
      }));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Kayıt olurken hata oluştu');
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authService.logout();
      setAuthState(initialAuthState);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback((user: User) => {
    setAuthState(prev => ({ ...prev, user }));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearTwoFactor = useCallback(() => {
    setAuthState(prev => ({
      ...prev,
      requiresTwoFactor: false,
      tempToken: undefined
    }));
  }, []);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          setAuthState(prev => ({
            ...prev,
            user,
            isAuthenticated: true,
            isLoading: false
          }));
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return {
    ...authState,
    login,
    verifyTwoFactor,
    register,
    logout,
    updateUser,
    clearError,
    clearTwoFactor
  };
};

// Auth Context
export const AuthContext = createContext<ReturnType<typeof useAuth> | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};