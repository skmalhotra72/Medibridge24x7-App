import { Search, Calendar, MessageCircle } from 'lucide-react';
import Section from '../components/Section';
import Card from '../components/Card';

export default function Solution() {
  const promises = [
    {
      icon: Search,
      title: 'Instant Prescription Clarity',
      description: 'Upload your prescription. Get every medicine explained in simple language. Know exactly what to take, when to take it, and what to expect - in Hindi, English, or your preferred language.',
    },
    {
      icon: Calendar,
      title: 'Smart Booking & Reminders',
      description: 'Compare lab prices across 500+ partners. Book home collection at the best rate. Schedule follow-ups. Get medication reminders. All in one place, all automated.',
    },
    {
      icon: MessageCircle,
      title: 'Always Available, Always Human',
      description: 'Ask questions anytime - our AI understands your context. For complex concerns, we connect you with human support. Healthcare that feels personal, even at 2 AM.',
    },
  ];

  return (
    <Section background="gradient">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Meet Your 24x7 Healthcare Companion
        </h2>
        <p className="text-xl text-gray-700">
          MediBridge doesn't replace your doctor. We extend their care - so you're never alone in your healthcare journey.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {promises.map((promise, index) => (
          <Card key={index} hover>
            <div className="text-center space-y-4">
              <div className="inline-flex w-16 h-16 bg-gradient-primary rounded-2xl items-center justify-center mb-4">
                <promise.icon className="w-8 h-8 text-primary-700" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">{promise.title}</h3>
              <p className="text-gray-600 leading-relaxed">{promise.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
