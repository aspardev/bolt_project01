import { User, LoginCredentials, TwoFactorSetup, TwoFactorVerification, RegisterData, PasswordReset, PasswordResetConfirm } from '../types/auth';

class AuthService {
  private baseUrl = '/api/auth';
  private tokenKey = 'auth_token';

  // Mock user data for demo
  private mockUser: User = {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    isEmailVerified: true,
    isTwoFactorEnabled: false,
    lastLogin: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: new Date().toISOString()
  };

  async login(credentials: LoginCredentials): Promise<{ user: User; token: string; requiresTwoFactor?: boolean; tempToken?: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock authentication logic
    if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
      if (this.mockUser.isTwoFactorEnabled) {
        return {
          user: this.mockUser,
          token: '',
          requiresTwoFactor: true,
          tempToken: 'temp_' + Date.now()
        };
      }

      const token = 'jwt_token_' + Date.now();
      localStorage.setItem(this.tokenKey, token);
      
      return {
        user: this.mockUser,
        token
      };
    }

    throw new Error('Geçersiz email veya şifre');
  }

  async verifyTwoFactor(verification: TwoFactorVerification): Promise<{ user: User; token: string }> {
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock 2FA verification (accept any 6-digit code for demo)
    if (verification.code.length === 6 && /^\d+$/.test(verification.code)) {
      const token = 'jwt_token_' + Date.now();
      localStorage.setItem(this.tokenKey, token);
      
      return {
        user: this.mockUser,
        token
      };
    }

    throw new Error('Geçersiz doğrulama kodu');
  }

  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    await new Promise(resolve => setTimeout(resolve, 1200));

    if (data.password !== data.confirmPassword) {
      throw new Error('Şifreler eşleşmiyor');
    }

    if (data.password.length < 8) {
      throw new Error('Şifre en az 8 karakter olmalı');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      role: 'user',
      isEmailVerified: false,
      isTwoFactorEnabled: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const token = 'jwt_token_' + Date.now();
    localStorage.setItem(this.tokenKey, token);

    return {
      user: newUser,
      token
    };
  }

  async setupTwoFactor(): Promise<TwoFactorSetup> {
    await new Promise(resolve => setTimeout(resolve, 600));

    // Mock 2FA setup data
    const secret = 'JBSWY3DPEHPK3PXP';
    const qrCode = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==`;
    const backupCodes = [
      '12345678',
      '87654321',
      '11223344',
      '44332211',
      '55667788'
    ];

    return {
      secret,
      qrCode,
      backupCodes
    };
  }

  async enableTwoFactor(code: string): Promise<{ backupCodes: string[] }> {
    await new Promise(resolve => setTimeout(resolve, 800));

    if (code.length !== 6 || !/^\d+$/.test(code)) {
      throw new Error('Geçersiz doğrulama kodu');
    }

    this.mockUser.isTwoFactorEnabled = true;
    this.mockUser.updatedAt = new Date().toISOString();

    return {
      backupCodes: [
        '12345678',
        '87654321',
        '11223344',
        '44332211',
        '55667788'
      ]
    };
  }

  async disableTwoFactor(password: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 600));

    if (password !== 'admin123') {
      throw new Error('Geçersiz şifre');
    }

    this.mockUser.isTwoFactorEnabled = false;
    this.mockUser.updatedAt = new Date().toISOString();
  }

  async requestPasswordReset(data: PasswordReset): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Mock password reset request
    console.log('Password reset requested for:', data.email);
  }

  async resetPassword(data: PasswordResetConfirm): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));

    if (data.password !== data.confirmPassword) {
      throw new Error('Şifreler eşleşmiyor');
    }

    if (data.password.length < 8) {
      throw new Error('Şifre en az 8 karakter olmalı');
    }

    // Mock password reset
    console.log('Password reset completed');
  }

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return null;

    await new Promise(resolve => setTimeout(resolve, 300));
    return this.mockUser;
  }

  async logout(): Promise<void> {
    localStorage.removeItem(this.tokenKey);
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  async updateProfile(updates: Partial<User>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    this.mockUser = {
      ...this.mockUser,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    return this.mockUser;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}

export const authService = new AuthService();