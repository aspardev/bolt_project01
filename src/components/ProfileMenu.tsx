import React from 'react';
import { useAuthContext } from '../hooks/useAuth';

const ProfileMenu: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { user, logout } = useAuthContext();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">✕</button>
        <div className="flex flex-col items-center mb-4">
          {user?.avatar && <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full mb-2" />}
          <div className="text-lg font-bold text-gray-800">{user?.name}</div>
          <div className="text-sm text-gray-500">{user?.email}</div>
        </div>
        <div className="space-y-2">
          <button className="w-full py-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-left">Profil Bilgilerim</button>
          <button className="w-full py-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-left">Şifre Değiştir</button>
          <button className="w-full py-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-left">2FA Ayarları</button>
          <button
            className="w-full py-2 px-4 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 text-left"
            onClick={async () => { await logout(); onClose(); }}
          >Çıkış Yap</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
