import React, { useState, useEffect } from 'react';
import { Shield, Copy, Download, Eye, EyeOff, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { authService } from '../../services/authService';
import { TwoFactorSetup as TwoFactorSetupType } from '../../types/auth';

interface TwoFactorSetupProps {
  onComplete: () => void;
  onCancel: () => void;
}

export const TwoFactorSetup: React.FC<TwoFactorSetupProps> = ({ onComplete, onCancel }) => {
  const [setupData, setSetupData] = useState<TwoFactorSetupType | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'setup' | 'verify' | 'backup'>('setup');

  useEffect(() => {
    loadSetupData();
  }, []);

  const loadSetupData = async () => {
    setIsLoading(true);
    try {
      const data = await authService.setupTwoFactor();
      setSetupData(data);
    } catch (err) {
      setError('2FA kurulum verileri yüklenirken hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError('6 haneli doğrulama kodunu girin');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await authService.enableTwoFactor(verificationCode);
      setBackupCodes(result.backupCodes);
      setStep('backup');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Doğrulama başarısız');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadBackupCodes = () => {
    const content = backupCodes.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup-codes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading && !setupData) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-gray-600">2FA kurulumu hazırlanıyor...</p>
      </div>
    );
  }

  if (step === 'backup') {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">2FA Başarıyla Etkinleştirildi</h1>
          <p className="text-gray-600">
            Yedek kodlarınızı güvenli bir yerde saklayın
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-800 mb-1">Önemli!</h3>
              <p className="text-yellow-700 text-sm">
                Bu kodları güvenli bir yerde saklayın. Telefonunuza erişiminizi kaybederseniz bu kodlarla giriş yapabilirsiniz.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">Yedek Kodlar</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowBackupCodes(!showBackupCodes)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                title={showBackupCodes ? 'Gizle' : 'Göster'}
              >
                {showBackupCodes ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={downloadBackupCodes}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                title="İndir"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            {backupCodes.map((code, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-3 rounded border">
                <code className="font-mono text-sm">
                  {showBackupCodes ? code : '••••••••'}
                </code>
                <button
                  onClick={() => copyToClipboard(code)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Kopyala"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onComplete}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
        >
          Tamamla
        </button>
      </div>
    );
  }

  if (step === 'verify') {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Kurulumu Doğrulayın</h1>
          <p className="text-gray-600">
            Google Authenticator'dan 6 haneli kodu girin
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Doğrulama Kodu
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => {
                setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                if (error) setError(null);
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-xl font-mono tracking-widest"
              placeholder="000000"
              maxLength={6}
            />
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setStep('setup')}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Geri
            </button>
            <button
              onClick={handleVerify}
              disabled={isLoading || verificationCode.length !== 6}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Doğrulanıyor...</span>
                </>
              ) : (
                <span>Doğrula</span>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">İki Faktörlü Doğrulama Kurulumu</h1>
        <p className="text-gray-600">
          Hesabınızı daha güvenli hale getirin
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Adım 1: QR Kodu Tarayın</h3>
          <p className="text-blue-800 text-sm mb-4">
            Google Authenticator uygulamasını açın ve aşağıdaki QR kodu tarayın
          </p>
          
          {setupData && (
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="w-48 h-48 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-sm">QR Kod Burada</span>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-2">Manuel giriş için:</p>
                <div className="flex items-center justify-center space-x-2">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                    {setupData.secret}
                  </code>
                  <button
                    onClick={() => copyToClipboard(setupData.secret)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Kopyala"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="font-medium text-green-900 mb-2">Adım 2: Kodu Doğrulayın</h3>
          <p className="text-green-800 text-sm">
            Uygulamada görünen 6 haneli kodu girerek kurulumu tamamlayın
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            İptal
          </button>
          <button
            onClick={() => setStep('verify')}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Devam Et
          </button>
        </div>
      </div>
    </div>
  );
};