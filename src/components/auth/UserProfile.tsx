import React, { useState } from 'react';
import { User, Shield, Settings, LogOut, Edit, Save, X, Loader2 } from 'lucide-react';
import { useAuthContext } from '../../hooks/useAuth';
import { TwoFactorSetup } from './TwoFactorSetup';
import { authService } from '../../services/authService';

interface UserProfileProps {
  onClose: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const { user, logout, updateUser } = useAuthContext();
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const updatedUser = await authService.updateProfile(editData);
      updateUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisableTwoFactor = async () => {
    if (!window.confirm('İki faktörlü doğrulamayı devre dışı bırakmak istediğinizden emin misiniz?')) {
      return;
    }

    setIsLoading(true);
    try {
      await authService.disableTwoFactor('admin123'); // In real app, ask for password
      const updatedUser = await authService.getCurrentUser();
      if (updatedUser) {
        updateUser(updatedUser);
      }
    } catch (error) {
      console.error('2FA disable error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorComplete = async () => {
    setShowTwoFactorSetup(false);
    const updatedUser = await authService.getCurrentUser();
    if (updatedUser) {
      updateUser(updatedUser);
    }
  };

  if (!user) return null;

  if (showTwoFactorSetup) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            <TwoFactorSetup
              onComplete={handleTwoFactorComplete}
              onCancel={() => setShowTwoFactorSetup(false)}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-xl font-semibold text-gray-900">Profil Ayarları</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <User className="w-4 h-4 inline mr-2" />
            Profil Bilgileri
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'security'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Shield className="w-4 h-4 inline mr-2" />
            Güvenlik
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                    user.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role === 'admin' ? 'Yönetici' : user.role === 'manager' ? 'Müdür' : 'Kullanıcı'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Soyad
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{user.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta Adresi
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{user.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kayıt Tarihi
                  </label>
                  <p className="text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Son Giriş
                  </label>
                  <p className="text-gray-900">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('tr-TR') : 'Bilinmiyor'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditData({ name: user.name, email: user.email });
                      }}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      İptal
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      disabled={isLoading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      <span>Kaydet</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Düzenle</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">İki Faktörlü Doğrulama</h3>
                    <p className="text-gray-600 text-sm">
                      Hesabınızı ekstra güvenlik katmanı ile koruyun
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.isTwoFactorEnabled 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isTwoFactorEnabled ? 'Aktif' : 'Pasif'}
                  </div>
                </div>

                {user.isTwoFactorEnabled ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-green-700">
                      <Shield className="w-5 h-5" />
                      <span className="text-sm">İki faktörlü doğrulama aktif</span>
                    </div>
                    <button
                      onClick={handleDisableTwoFactor}
                      disabled={isLoading}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}
                      <span>Devre Dışı Bırak</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-orange-700">
                      <Settings className="w-5 h-5" />
                      <span className="text-sm">İki faktörlü doğrulama pasif</span>
                    </div>
                    <button
                      onClick={() => setShowTwoFactorSetup(true)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Etkinleştir</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Oturum Yönetimi</h3>
                <button
                  onClick={logout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Çıkış Yap</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};