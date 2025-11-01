import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import UploadModal from './components/UploadModal';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

function App() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <Navigation onUploadClick={() => setIsUploadModalOpen(true)} />

          <Routes>
            <Route
              path="/"
              element={
                <main>
                  <HomePage onUploadClick={() => setIsUploadModalOpen(true)} />
                </main>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />

          <UploadModal
            isOpen={isUploadModalOpen}
            onClose={() => setIsUploadModalOpen(false)}
          />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
