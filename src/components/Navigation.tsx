import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Shield } from 'lucide-react';
import Button from './Button';

interface NavigationProps {
  onUploadClick: () => void;
}

export default function Navigation({ onUploadClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Benefits', href: '#benefits' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Team', href: '#team' },
    { label: 'FAQs', href: '#faq' },
  ];

  const scrollToSection = (href: string) => {
    if (location.pathname !== '/') {
      window.location.href = '/' + href;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-700" fill="currentColor" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary-900">MediBridge</h1>
                <p className="text-xs text-gray-600">Your AI Healthcare Companion</p>
              </div>
            </Link>

            {!isAdminPage && (
              <div className="hidden lg:flex items-center space-x-8">
                {menuItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Admin
                </Link>
              </div>
            )}

            <div className="hidden lg:flex items-center space-x-4">
              {isAdminPage ? (
                <Link to="/">
                  <Button variant="outline" size="sm">
                    Back to Home
                  </Button>
                </Link>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={onUploadClick}>
                    Upload Prescription
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => scrollToSection('#contact')}>
                    Talk to MediBridge
                  </Button>
                </>
              )}
            </div>

            <button
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-white pt-20">
          <div className="container mx-auto px-4 py-8 flex flex-col space-y-6">
            {!isAdminPage && menuItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-lg text-gray-700 hover:text-primary-600 font-medium transition-colors text-left"
              >
                {item.label}
              </button>
            ))}
            <Link to="/admin" className="block">
              <button className="text-lg text-gray-700 hover:text-primary-600 font-medium transition-colors text-left">
                Admin
              </button>
            </Link>
            <div className="pt-4 space-y-3">
              {isAdminPage ? (
                <Link to="/" className="block">
                  <Button variant="outline" className="w-full">
                    Back to Home
                  </Button>
                </Link>
              ) : (
                <>
                  <Button variant="outline" className="w-full" onClick={onUploadClick}>
                    Upload Prescription
                  </Button>
                  <Button variant="primary" className="w-full" onClick={() => scrollToSection('#contact')}>
                    Talk to MediBridge
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
