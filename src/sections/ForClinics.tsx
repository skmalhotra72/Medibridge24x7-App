import { X, Check, TrendingUp } from 'lucide-react';
import Section from '../components/Section';
import Button from '../components/Button';

export default function ForClinics() {
  const problems = [
    '10-20 after-hours calls daily',
    'Patients confused post-consultation',
    'Losing diagnostic revenue to external labs',
    'No bandwidth for 24x7 support',
    'Falling satisfaction scores',
    'Can\'t afford extra staff',
  ];

  const solutions = [
    'AI handles routine queries automatically',
    'Patients get instant clarification',
    'Retain tests through partner labs',
    'Automated 24x7 support',
    '40% satisfaction increase on average',
    '₹5-15K/month, not ₹50K+ salaries',
  ];

  const roiData = [
    { label: 'Diagnostics to external labs', value: '₹80,000' },
    { label: 'Missed follow-ups', value: '₹30,000' },
    { label: 'Patient churn (poor support)', value: '₹40,000' },
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Section background="dark">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <p className="text-sm font-semibold text-accent-300 uppercase tracking-wide mb-4">For Healthcare Providers</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Extend Your Care Without Extra Staff
        </h2>
        <p className="text-xl text-gray-300">
          White-labeled AI assistant that works 24x7 in your clinic's name
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-white mb-6">The Problem You Face</h3>
          <ul className="space-y-3">
            {problems.map((problem, index) => (
              <li key={index} className="flex items-start space-x-3">
                <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{problem}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-white mb-6">How MediBridge Helps</h3>
          <ul className="space-y-3">
            {solutions.map((solution, index) => (
              <li key={index} className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-accent-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{solution}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-accent rounded-2xl p-8 text-gray-900">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="w-6 h-6 text-accent-700" />
            <h3 className="text-2xl font-semibold">ROI Example</h3>
          </div>
          <p className="text-sm mb-4">Typical 50-patient/day clinic:</p>

          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm font-semibold mb-2">Lost monthly revenue without MediBridge:</p>
              <ul className="space-y-2">
                {roiData.map((item, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span>{item.label}:</span>
                    <span className="font-semibold text-red-700">{item.value}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t-2 border-gray-900 mt-2 pt-2 flex justify-between font-bold">
                <span>Total:</span>
                <span className="text-red-700">₹1,50,000/month</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>MediBridge cost:</span>
                <span className="font-semibold">₹10,000/month</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Revenue retained:</span>
                <span className="font-semibold text-green-700">₹1,00,000/month</span>
              </div>
              <div className="border-t-2 border-gray-200 pt-2 flex justify-between font-bold text-lg">
                <span>Net gain:</span>
                <span className="text-green-700">₹90,000/month</span>
              </div>
            </div>
          </div>

          <div className="bg-accent-700 text-white rounded-xl p-4 text-center">
            <p className="text-3xl font-bold">900%</p>
            <p className="text-sm">ROI in first year</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button variant="primary" size="lg" onClick={scrollToContact}>
          Schedule a Demo
        </Button>
      </div>
    </Section>
  );
}
