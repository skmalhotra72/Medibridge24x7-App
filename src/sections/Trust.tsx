import { Lock, MapPin, Shield, Hand } from 'lucide-react';
import Section from '../components/Section';
import Card from '../components/Card';

export default function Trust() {
  const badges = [
    {
      icon: Lock,
      title: 'Bank-Level Encryption',
      description: '256-bit SSL encryption for all data transmission. Your prescriptions and health records are as secure as your bank account.',
    },
    {
      icon: MapPin,
      title: 'Data Stored in India',
      description: 'All your health information stays in India, complying with data sovereignty laws. We never transfer data outside the country.',
    },
    {
      icon: Shield,
      title: 'ABDM Aligned',
      description: 'Built in alignment with Ayushman Bharat Digital Mission standards. Ready for India\'s unified health ecosystem.',
    },
    {
      icon: Hand,
      title: 'You Control Your Data',
      description: 'You decide who sees your health records. Delete anytime. We never sell your data to third parties. Ever.',
    },
  ];

  return (
    <Section background="white">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Your Health Data is Sacred
        </h2>
        <p className="text-xl text-gray-700">
          We don't just protect your data - we respect it
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {badges.map((badge, index) => (
          <Card key={index} hover>
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <badge.icon className="w-7 h-7 text-primary-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{badge.title}</h3>
                <p className="text-gray-600 leading-relaxed">{badge.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center space-x-6 text-sm text-gray-500">
        <a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a>
        <span>•</span>
        <a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a>
        <span>•</span>
        <a href="#" className="hover:text-primary-600 transition-colors">Data Security</a>
      </div>
    </Section>
  );
}
