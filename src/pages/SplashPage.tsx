import React, { useEffect, useState } from 'react';
import SplashScreen from '../components/SplashScreen';

const SplashPage: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [onFinish]);

  return <SplashScreen progress={progress} />;
};

export default SplashPage;
