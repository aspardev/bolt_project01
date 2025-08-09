
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import SplashPage from './pages/SplashPage';
import AuthPage from './pages/AuthPage';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import Navbar from './components/Navbar';
import ProfileMenu from './components/ProfileMenu';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashPage onFinish={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Navbar onProfileClick={() => setShowProfile(true)} />
                {showProfile && <ProfileMenu onClose={() => setShowProfile(false)} />}
                <DashboardPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Navbar onProfileClick={() => setShowProfile(true)} />
                {showProfile && <ProfileMenu onClose={() => setShowProfile(false)} />}
                <DashboardPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Navbar onProfileClick={() => setShowProfile(true)} />
                {showProfile && <ProfileMenu onClose={() => setShowProfile(false)} />}
                <ProductsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default App;