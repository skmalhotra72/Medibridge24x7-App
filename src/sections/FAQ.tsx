import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Section from '../components/Section';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Is MediBridge a replacement for my doctor?',
      answer: 'No, absolutely not. MediBridge is your healthcare companion that helps you understand and follow your doctor\'s advice. We clarify prescriptions, book appointments, and answer routine questions - but we always encourage consulting your doctor for medical decisions. Think of us as a bridge between consultations, not a replacement for professional medical care.',
    },
    {
      question: 'How accurate is the prescription reading?',
      answer: 'Our AI achieves 92% accuracy in reading prescriptions, including doctor\'s handwriting. We\'re trained on lakhs of Indian prescriptions and continuously improve. For complex or unclear prescriptions, we flag them for human verification. We also cross-check medicine names against standard databases to ensure accuracy.',
    },
    {
      question: 'Which languages does MediBridge support?',
      answer: 'We currently support Hindi, English, Tamil, Telugu, Kannada, Malayalam, Bengali, Marathi, and Gujarati - both text and voice. We can read prescriptions in any language and respond in your preferred language. More regional languages are being added based on user demand.',
    },
    {
      question: 'Is my health data secure?',
      answer: 'Absolutely. We use bank-level 256-bit encryption for all data. Your health records are stored on secure servers in India and never leave the country. We comply with healthcare data protection standards. You control who can access your data, and we never sell your information to third parties. You can delete your data anytime.',
    },
    {
      question: 'How much does MediBridge cost for patients?',
      answer: 'Basic services are FREE for patients: Prescription interpretation, Medicine explanations, Basic queries and reminders. Premium features (₹99/month): Family health tracking for up to 5 members, Detailed health insights and trends, Priority human support, Advanced medication adherence tracking. Lab bookings and pharmacy orders are free - you only pay for the actual services.',
    },
    {
      question: 'How do clinics integrate MediBridge?',
      answer: 'Integration is simple and fast: 1) We set up a white-labeled app in your clinic\'s name (3-5 days), 2) Connect with your existing EMR/appointment system via APIs, 3) Train your staff on the dashboard (2-hour session), 4) We handle patient onboarding via QR codes/WhatsApp. No hardware needed. No disruption to existing workflow. Technical support included. Most clinics are fully live within a week.',
    },
    {
      question: 'What if I have an emergency?',
      answer: 'For medical emergencies, always call emergency services (112 in India) or visit the nearest hospital immediately. MediBridge is designed for post-consultation support and routine healthcare questions, not emergency medical situations. Our AI is trained to recognize emergency keywords and will immediately direct you to call emergency services or your doctor if it detects an urgent medical situation.',
    },
    {
      question: 'Can I book diagnostic tests through MediBridge?',
      answer: 'Yes! We partner with 500+ NABL-certified labs across India. You can: Compare prices across labs (save 20-40% on average), Check availability and slots, Book home sample collection, Track your sample status, Receive reports via email/app, Get reminders for periodic tests. All lab partners are verified, certified, and trusted.',
    },
    {
      question: 'How does MediBridge make money?',
      answer: 'We have a transparent business model. From Clinics (B2B): Monthly subscription: ₹5,000-₹15,000 based on patient volume, White-labeled app and integration included. From Transactions: 3-5% commission on diagnostic bookings (shared with clinics), 5-7% commission on pharmacy orders. From Patients (optional): Premium subscription: ₹99/month for advanced features. Patients never pay for basic prescription interpretation or AI chat support.',
    },
    {
      question: 'What if MediBridge doesn\'t understand my question?',
      answer: 'Our AI is designed to ask clarifying questions if it doesn\'t understand. If the query is too complex or requires medical judgment: 1) The AI will acknowledge its limitations, 2) It will offer to connect you with human support, 3) You can schedule a tele-consultation with a healthcare professional, 4) Or it will guide you to book a clinic appointment. We believe in transparency - if we don\'t know, we say so and connect you with someone who does.',
    },
    {
      question: 'Can I use MediBridge for my whole family?',
      answer: 'Yes! With a premium subscription (₹99/month), you can: Add up to 5 family members, Maintain separate health profiles for each, Upload prescriptions for anyone in the family, Track medications for elderly parents or children, Get age-appropriate medication reminders, Share specific records with family members. Each family member\'s data remains private unless you choose to share.',
    },
    {
      question: 'How do I get started?',
      answer: 'It\'s easy to begin! For Patients: 1) Click "Upload Prescription" above, 2) Take a photo or upload your prescription, 3) Create a free account, 4) Start asking questions immediately. Or message us on WhatsApp: +91-9876543210. For Clinics: 1) Click "Schedule a Demo", 2) Our team will walk you through the platform, 3) Get a customized quote based on your needs, 4) Go live within a week. Try it risk-free - see how MediBridge transforms your healthcare experience!',
    },
  ];

  return (
    <Section id="faq" background="gradient">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Your Questions, Answered
        </h2>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <h3 className="text-lg font-semibold text-gray-900 pr-8">{faq.question}</h3>
              <ChevronDown
                className={`w-6 h-6 text-gray-400 transition-transform flex-shrink-0 ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
