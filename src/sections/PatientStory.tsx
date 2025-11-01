import { CheckCircle } from 'lucide-react';
import Section from '../components/Section';
import Button from '../components/Button';

interface PatientStoryProps {
  onUploadClick: () => void;
}

export default function PatientStory({ onUploadClick }: PatientStoryProps) {
  const outcomes = [
    '3 labs nearby for HbA1c test (₹400 to ₹800)',
    'Option to book home collection for tomorrow 8 AM',
    'A medication reminder set for after breakfast and dinner',
    'Her follow-up appointment scheduled for 2 weeks',
  ];

  return (
    <Section background="gradient">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-2 bg-accent-100 rounded-full text-accent-700 font-semibold text-sm mb-4">
            Real Story
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            From Midnight Panic to Morning Confidence
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl space-y-6 text-gray-700 leading-relaxed">
          <p>
            <span className="font-semibold text-gray-900">Mrs. Sharma from Dwarka</span> visited her doctor for diabetes management. She left with a prescription, a list of tests, and a head full of questions.
          </p>

          <p>
            At 11 PM, she remembered: <span className="italic">"Did the doctor say take Metformin before or after meals?"</span> Her daughter helped her find the prescription. "BD PC" - what does that mean?
          </p>

          <p className="font-medium text-gray-900">She opened MediBridge on WhatsApp. Took a photo of the prescription.</p>

          <div className="bg-gradient-accent rounded-2xl p-6 my-6">
            <p className="font-semibold text-gray-900 mb-3">Within 30 seconds:</p>
            <p className="text-gray-800">
              "Metformin 500mg - Take one tablet twice daily after meals to control blood sugar. Common side effects may include stomach upset initially."
            </p>
          </div>

          <div className="space-y-3">
            <p className="font-medium text-gray-900">The app then showed her:</p>
            <ul className="space-y-2">
              {outcomes.map((outcome, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent-600 mt-1 flex-shrink-0" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-primary-50 rounded-2xl p-6 border-l-4 border-primary-600">
            <p className="text-lg font-semibold text-gray-900">Total time: 2 minutes.</p>
            <p className="text-lg font-semibold text-primary-700">Total peace of mind: Priceless.</p>
          </div>

          <p>
            Mrs. Sharma slept well that night. Her daughter didn't have to Google "metformin side effects" and panic. And her doctor got one less midnight call.
          </p>

          <p className="text-xl font-semibold text-gray-900 text-center pt-4">
            That's the MediBridge difference.
          </p>
        </div>

        <div className="text-center mt-12">
          <Button variant="primary" size="lg" onClick={onUploadClick}>
            Experience This Yourself
          </Button>
        </div>
      </div>
    </Section>
  );
}
