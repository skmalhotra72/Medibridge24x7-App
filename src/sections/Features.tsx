import { useState } from 'react';
import { FileText, MessageSquare, TestTubes, Calendar, Pill, FolderOpen, ChevronDown } from 'lucide-react';
import Section from '../components/Section';

export default function Features() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const features = [
    {
      icon: FileText,
      title: 'AI Prescription Reader',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">Upload prescriptions in any format:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Photos from your phone</li>
            <li>PDF files from email</li>
            <li>Scanned documents</li>
          </ul>
          <p className="font-medium text-gray-900 mt-4">Our AI reads:</p>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Doctor's handwriting (92% accuracy)</li>
            <li>✓ Multiple languages on prescription</li>
            <li>✓ Medicine names (branded & generic)</li>
            <li>✓ Dosage instructions and timing</li>
            <li>✓ Test recommendations</li>
          </ul>
          <p className="font-medium text-gray-900 mt-4">You get:</p>
          <ul className="space-y-2 text-gray-700">
            <li>→ Plain language explanation</li>
            <li>→ Dosage breakdown with visuals</li>
            <li>→ Timing reminders</li>
            <li>→ Side effects & precautions</li>
            <li>→ Drug interaction alerts</li>
          </ul>
        </div>
      ),
    },
    {
      icon: MessageSquare,
      title: 'Multilingual AI Chat',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">Ask anything, anytime:</p>
          <div className="bg-gray-50 rounded-xl p-4 space-y-2 italic text-gray-700">
            <p>"When should I take this medicine?"</p>
            <p>"What are the side effects?"</p>
            <p>"Can I take this with food?"</p>
            <p>"What does this test check for?"</p>
          </div>
          <p className="font-medium text-gray-900">Supported languages:</p>
          <p className="text-gray-700">Hindi • Tamil • Telugu • Bengali • Marathi • Kannada • Malayalam • Gujarati • English</p>
          <p className="font-medium text-gray-900 mt-4">Works via:</p>
          <ul className="space-y-2 text-gray-700">
            <li>→ Text chat in web app</li>
            <li>→ WhatsApp messages</li>
            <li>→ Voice calls (coming soon)</li>
            <li>→ Email queries</li>
          </ul>
        </div>
      ),
    },
    {
      icon: TestTubes,
      title: 'Smart Lab Booking',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">Compare prices across 500+ labs:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>NABL certified partners</li>
            <li>Real-time pricing</li>
            <li>Availability check</li>
            <li>Home collection slots</li>
          </ul>
          <p className="font-medium text-gray-900 mt-4">Features:</p>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Save 20-40% on average</li>
            <li>✓ Book home collection</li>
            <li>✓ Get reports via email/app</li>
            <li>✓ Track sample status</li>
            <li>✓ Set test reminders</li>
          </ul>
        </div>
      ),
    },
    {
      icon: Calendar,
      title: 'Appointment Management',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">Never miss a follow-up:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Check doctor availability</li>
            <li>Book/reschedule appointments</li>
            <li>Get reminders 24 hours before</li>
            <li>Add to your calendar</li>
            <li>Receive clinic location/parking info</li>
          </ul>
          <p className="font-medium text-gray-900 mt-4">Integrates with:</p>
          <ul className="space-y-2 text-gray-700">
            <li>→ Google Calendar</li>
            <li>→ Clinic PMS systems</li>
            <li>→ WhatsApp notifications</li>
          </ul>
        </div>
      ),
    },
    {
      icon: Pill,
      title: 'Medicine Ordering',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">Order from verified pharmacies:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Compare prices across vendors</li>
            <li>Check medicine authenticity</li>
            <li>Same-day delivery available</li>
            <li>Track order status</li>
            <li>Prescription auto-attached</li>
          </ul>
          <p className="font-medium text-gray-900 mt-4">Safety features:</p>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Only licensed pharmacies</li>
            <li>✓ Authenticity verification</li>
            <li>✓ Expiry date checks</li>
            <li>✓ Secure payment</li>
          </ul>
        </div>
      ),
    },
    {
      icon: FolderOpen,
      title: 'Health Records',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">Your complete health history:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>All prescriptions organized</li>
            <li>Test reports accessible</li>
            <li>Doctor visit summaries</li>
            <li>Vaccination records</li>
            <li>Family health profiles</li>
          </ul>
          <p className="font-medium text-gray-900 mt-4">Security:</p>
          <ul className="space-y-2 text-gray-700">
            <li>🔒 Bank-level encryption</li>
            <li>🔒 Data stored in India</li>
            <li>🔒 You control sharing</li>
            <li>🔒 HIPAA-compliant</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <Section background="gradient">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Everything You Need in One Place
        </h2>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <ChevronDown
                className={`w-6 h-6 text-gray-400 transition-transform ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                {feature.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
