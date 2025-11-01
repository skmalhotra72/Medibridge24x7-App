import { useState } from 'react';
import { Globe, Pill, TestTube, Clock, Store, FileText, PhoneOff, IndianRupee, Star, Link, TrendingUp, Shield } from 'lucide-react';
import Section from '../components/Section';
import Card from '../components/Card';

export default function Benefits() {
  const [activeTab, setActiveTab] = useState<'patients' | 'clinics'>('patients');

  const patientBenefits = [
    {
      icon: Globe,
      title: '24x7 Multilingual Support',
      description: 'Get answers in Hindi, Tamil, Telugu, Bengali, Marathi, Kannada, Malayalam, English, and more. Healthcare that speaks YOUR language.',
    },
    {
      icon: Pill,
      title: 'Prescription Decoded',
      description: 'No more confusion about "BD", "OD", "PC", or "HS". Get clear explanations of every medicine, dosage, timing, and precaution.',
    },
    {
      icon: TestTube,
      title: 'Smart Lab Booking',
      description: 'Compare prices across 500+ partner labs. Save up to 40% on diagnostics. Book home collection with a tap. Get reports automatically.',
    },
    {
      icon: Clock,
      title: 'Medication Reminders',
      description: 'Never miss a dose. Get timely reminders based on your prescription. Track adherence. Feel confident you\'re following treatment correctly.',
    },
    {
      icon: Store,
      title: 'Trusted Pharmacy Network',
      description: 'Find verified pharmacies nearby. Order with delivery tracking. Get authentic medicines at competitive prices.',
    },
    {
      icon: FileText,
      title: 'Your Health History',
      description: 'All your prescriptions, test reports, and consultations in one secure place. Share with any doctor anytime.',
    },
  ];

  const clinicBenefits = [
    {
      icon: PhoneOff,
      title: 'Reduce After-Hours Calls',
      description: 'Automate patient queries post-consultation. Free up your team from repetitive questions. Focus on care, not admin.',
    },
    {
      icon: IndianRupee,
      title: 'Retain Diagnostic Revenue',
      description: 'Patients book tests through your recommended labs. Prevent revenue leakage to external aggregators. Earn partnership commissions.',
    },
    {
      icon: Star,
      title: 'Improve Patient Satisfaction',
      description: 'Provide 24x7 support without hiring extra staff. Reduce patient confusion. Build loyalty through better post-consultation care.',
    },
    {
      icon: Link,
      title: 'Seamless Integration',
      description: 'Works with your existing systems. Integrates with EMR, billing, and appointment software. White-labeled app in your clinic\'s name.',
    },
    {
      icon: TrendingUp,
      title: 'Data & Insights',
      description: 'Understand patient behavior, common queries, and treatment adherence. Optimize engagement with predictive analytics.',
    },
    {
      icon: Shield,
      title: 'Doctor-Approved Guardrails',
      description: 'AI follows your protocols and guidelines. Complex cases escalate to human support. You maintain control, we handle routine.',
    },
  ];

  const benefits = activeTab === 'patients' ? patientBenefits : clinicBenefits;

  return (
    <Section id="benefits" background="gradient">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Why Patients & Clinics Choose MediBridge
        </h2>
        <p className="text-xl text-gray-700">
          We serve both sides of healthcare - empowering patients and enabling clinics
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-white rounded-2xl p-2 shadow-lg">
          <button
            onClick={() => setActiveTab('patients')}
            className={`px-8 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'patients'
                ? 'bg-gradient-primary text-primary-900 shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            For Patients
          </button>
          <button
            onClick={() => setActiveTab('clinics')}
            className={`px-8 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'clinics'
                ? 'bg-gradient-primary text-primary-900 shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            For Clinics
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <Card key={index} hover>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <benefit.icon className="w-6 h-6 text-primary-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
