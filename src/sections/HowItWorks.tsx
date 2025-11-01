import { Upload, Brain, CheckCircle } from 'lucide-react';
import Section from '../components/Section';

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      number: '01',
      title: 'Share Your Prescription',
      description: 'Take a photo of your prescription, upload a PDF, or even share a voice note describing your concern. MediBridge works through:',
      features: [
        'WhatsApp: +91-9876543210',
        'Email: ask@medibridge24x7.com',
        'Our web app (this site!)',
        'Voice call support',
      ],
    },
    {
      icon: Brain,
      number: '02',
      title: 'Get AI-Powered Guidance',
      description: 'Our AI instantly reads your prescription (yes, even doctor\'s handwriting!), explains each medicine, suggests diagnostic tests, and answers your questions - all in your language.',
      example: {
        input: '"Metformin 500mg BD PC"',
        output: '"Take one tablet of Metformin twice daily after meals to help control your blood sugar levels."',
      },
    },
    {
      icon: CheckCircle,
      number: '03',
      title: 'Book, Track & Stay Informed',
      description: 'Take action with ease:',
      features: [
        'Compare lab prices and book home collection',
        'Order medicines from verified pharmacies',
        'Schedule your follow-up appointment',
        'Get reminders for medications and tests',
        'Access your complete health history anytime',
      ],
    },
  ];

  return (
    <Section id="how-it-works" background="white">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Three Simple Steps to Peace of Mind
        </h2>
      </div>

      <div className="space-y-12">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`grid lg:grid-cols-2 gap-8 items-center ${
              index % 2 === 1 ? 'lg:grid-flow-dense' : ''
            }`}
          >
            <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
              <div className="bg-gradient-primary rounded-3xl p-12 shadow-xl h-full flex items-center justify-center">
                <div className="text-center">
                  <step.icon className="w-24 h-24 text-primary-700 mx-auto mb-4" />
                  <div className="text-8xl font-bold text-primary-900 opacity-20">{step.number}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-primary-100 rounded-full">
                <p className="text-sm font-semibold text-primary-700">STEP {step.number}</p>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{step.title}</h3>
              <p className="text-gray-700 leading-relaxed">{step.description}</p>

              {step.features && (
                <ul className="space-y-2 pt-2">
                  {step.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-primary-600 mt-1">•</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {step.example && (
                <div className="bg-gradient-accent rounded-xl p-6 mt-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Example:</p>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">Input:</span> {step.example.input}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Output:</span> {step.example.output}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
