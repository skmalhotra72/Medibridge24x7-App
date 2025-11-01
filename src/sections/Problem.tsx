import { Clock, HelpCircle, TrendingDown, IndianRupee } from 'lucide-react';
import Section from '../components/Section';

export default function Problem() {
  const stats = [
    { icon: Clock, value: '5-7 min', label: 'Average consultation time' },
    { icon: HelpCircle, value: '0 hrs', label: 'After-hours support available' },
    { icon: TrendingDown, value: '60%', label: 'Patients confused about prescriptions' },
    { icon: IndianRupee, value: '₹5,000 Cr', label: 'Annual revenue loss for clinics' },
  ];

  return (
    <Section background="white">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="bg-gradient-accent rounded-3xl p-8 shadow-xl">
            <div className="bg-white rounded-2xl p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">11:30 PM</span>
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-xs font-mono text-gray-700">Rx: Metformin 500mg BD PC</p>
                  <p className="text-xs font-mono text-gray-700">Aspirin 75mg OD HS</p>
                </div>
                <div className="flex items-start space-x-2">
                  <HelpCircle className="w-5 h-5 text-primary-600 mt-1" />
                  <p className="text-sm text-gray-700 italic">"What does BD PC mean? Before or after meals?"</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 text-center">Patient at home, clinic closed, no answers...</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">The Problem We're Solving</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              India's Healthcare Journey Ends Halfway
            </h2>
          </div>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              You leave your doctor's office with a prescription you barely understand. "BD PC" - what does that even mean? Should you take the blue pill before or after meals? Which lab should you go to for tests?
            </p>
            <p>
              After clinic hours, you're on your own. You Google your symptoms - suddenly that gas trouble looks like cancer. You call the chemist, hoping for answers. You wish you could just ask your doctor one more question.
            </p>
            <p className="font-medium text-gray-900">
              But the clinic is closed. The doctor is unavailable. And you're left confused, worried, and wondering if you're doing this right.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-red-50 border border-red-200 rounded-xl p-4">
                <stat.icon className="w-6 h-6 text-red-600 mb-2" />
                <p className="text-2xl font-bold text-red-700">{stat.value}</p>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
