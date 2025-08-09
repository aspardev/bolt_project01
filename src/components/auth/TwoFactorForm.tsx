import React, { useState, useRef, useEffect } from 'react';
import { Shield, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { useAuthContext } from '../../hooks/useAuth';

interface TwoFactorFormProps {
  onBack: () => void;
}

export const TwoFactorForm: React.FC<TwoFactorFormProps> = ({ onBack }) => {
  const { verifyTwoFactor, isLoading, error, clearError, tempToken } = useAuthContext();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (error) clearError();

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      handleSubmit(newCode.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    
    if (pastedData.length === 6) {
      const newCode = pastedData.split('');
      setCode(newCode);
      handleSubmit(pastedData);
    }
  };

  const handleSubmit = async (codeString?: string) => {
    const finalCode = codeString || code.join('');
    if (finalCode.length !== 6 || !tempToken) return;

    await verifyTwoFactor({
      token: tempToken,
      code: finalCode
    });
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">İki Faktörlü Doğrulama</h1>
        <p className="text-gray-600">
          Google Authenticator uygulamanızdan 6 haneli kodu girin
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleManualSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
            Doğrulama Kodu
          </label>
          <div className="flex justify-center space-x-3" onPaste={handlePaste}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                disabled={isLoading}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || code.some(digit => !digit)}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Doğrulanıyor...</span>
            </>
          ) : (
            <span>Doğrula</span>
          )}
        </button>
      </form>

      <div className="mt-6">
        <button
          onClick={onBack}
          className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 py-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Geri Dön</span>
        </button>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Google Authenticator Nasıl Kullanılır?</h3>
        <ol className="text-sm text-blue-800 space-y-1">
          <li>1. Google Authenticator uygulamasını açın</li>
          <li>2. Hesabınız için oluşturulan 6 haneli kodu bulun</li>
          <li>3. Kodu yukarıdaki alanlara girin</li>
        </ol>
      </div>
    </div>
  );
};