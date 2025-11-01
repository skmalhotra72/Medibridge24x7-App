import { Brain, ScanText, Mic, Link, Database, ShieldCheck } from 'lucide-react';
import Section from '../components/Section';
import Card from '../components/Card';

export default function Technology() {
  const technologies = [
    {
      icon: Brain,
      title: 'Indian Medical NLP',
      description: 'Trained on lakhs of Indian prescriptions. Understands regional medicine names, local healthcare practices, and Indian medical abbreviations.',
    },
    {
      icon: ScanText,
      title: 'Advanced OCR',
      description: 'Reads doctor\'s handwriting with 92% accuracy. Handles multiple languages, faded ink, and poor image quality.',
    },
    {
      icon: Mic,
      title: 'Multilingual Voice AI',
      description: 'Natural conversations in 9+ Indian languages. Understands accents and regional dialects.',
    },
    {
      icon: Link,
      title: 'Universal Integration',
      description: 'Connects with clinic EMRs, Google Calendar, Gmail, WhatsApp, and popular healthcare platforms via APIs.',
    },
    {
      icon: Database,
      title: 'Contextual Memory',
      description: 'Remembers your entire health journey. Every conversation builds on previous context for personalized support.',
    },
    {
      icon: ShieldCheck,
      title: 'Safety Guardrails',
      description: 'Doctor-approved response protocols. Escalates complex medical queries to human support automatically.',
    },
  ];

  return (
    <Section background="gradient">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Powered by Purpose-Built AI
        </h2>
        <p className="text-xl text-gray-700">
          Not generic chatbots - healthcare-specific intelligence
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {technologies.map((tech, index) => (
          <Card key={index} hover>
            <div className="text-center space-y-4">
              <div className="inline-flex w-16 h-16 bg-gradient-primary rounded-2xl items-center justify-center">
                <tech.icon className="w-8 h-8 text-primary-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{tech.title}</h3>
              <p className="text-gray-600 leading-relaxed">{tech.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
