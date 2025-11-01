import { Upload, ArrowDown, Building2, Target, Globe } from 'lucide-react';
import Button from '../components/Button';

interface HeroProps {
  onUploadClick: () => void;
}

export default function Hero({ onUploadClick }: HeroProps) {
  const scrollToHowItWorks = () => {
    const element = document.querySelector('#how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-subtle overflow-hidden pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-200 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              From Confusion to{' '}
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Confidence
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 font-light leading-relaxed">
              Your AI-powered healthcare companion. Available 24x7 in your language.
            </p>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl">
              Walk out of your clinic with clarity, not questions. MediBridge decodes your prescription, explains every medicine, books your tests, and reminds you of follow-ups - all in the language you're comfortable with.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-md">
                <Building2 className="w-5 h-5 text-primary-600" />
                <div className="text-left">
                  <p className="text-xs text-gray-500">Trusted By</p>
                  <p className="text-sm font-semibold text-gray-900">500+ Clinics</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-md">
                <Target className="w-5 h-5 text-accent-600" />
                <div className="text-left">
                  <p className="text-xs text-gray-500">Accuracy</p>
                  <p className="text-sm font-semibold text-gray-900">92% Precision</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-md">
                <Globe className="w-5 h-5 text-primary-600" />
                <div className="text-left">
                  <p className="text-xs text-gray-500">Languages</p>
                  <p className="text-sm font-semibold text-gray-900">9+ Indian</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
              <Button variant="primary" size="lg" onClick={onUploadClick} className="gap-2">
                <Upload className="w-5 h-5" />
                Upload Your Prescription
              </Button>
              <Button variant="outline" size="lg" onClick={scrollToHowItWorks} className="gap-2">
                See How It Works
                <ArrowDown className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative w-full h-[600px]">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl shadow-2xl transform rotate-3 animate-pulse opacity-20"></div>
              <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="h-full flex flex-col">
                  <div className="flex items-center space-x-3 mb-6 pb-6 border-b-2 border-gray-100">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <span className="text-2xl">💊</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Prescription Analysis</p>
                      <p className="text-sm text-gray-500">AI-Powered Clarity</p>
                    </div>
                  </div>

                  <div className="space-y-4 flex-1">
                    <div className="bg-gradient-accent rounded-xl p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Metformin 500mg - BD PC</p>
                      <p className="text-xs text-gray-700">Take one tablet twice daily after meals to control blood sugar levels.</p>
                    </div>

                    <div className="bg-primary-50 rounded-xl p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Lab Tests Recommended</p>
                      <p className="text-xs text-gray-700">HbA1c Test - ₹400 to ₹800</p>
                      <p className="text-xs text-primary-600 font-medium mt-2">Compare & Book →</p>
                    </div>

                    <div className="bg-white border-2 border-primary-200 rounded-xl p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Medication Reminders</p>
                      <p className="text-xs text-gray-700">After breakfast & dinner</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t-2 border-gray-100">
                    <p className="text-xs text-center text-gray-500">
                      ✓ Available in Hindi, English & 7 more languages
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
