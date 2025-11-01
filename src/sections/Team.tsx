import { Linkedin, Users } from 'lucide-react';
import Section from '../components/Section';
import Card from '../components/Card';

export default function Team() {
  const teamMembers = [
    { name: 'Kunal Bellur', role: 'Project Lead', description: 'Leading innovation at the intersection of AI and healthcare. Passionate about making quality care accessible to every Indian.' },
    { name: 'Sanjeev Malhotra', role: 'Strategy & Product Development', description: '30 years of experience across healthcare, hospitality, and analytics. Former medical consultant with deep industry insights.' },
    { name: 'Ashwini Beloshe', role: 'Patient Experience Lead', description: 'Driving patient-centric design and ensuring every interaction feels human, helpful, and culturally sensitive.' },
    { name: 'Aayush Arora', role: 'AI/ML Engineer', description: 'Building the intelligent systems that understand Indian healthcare context and deliver accurate, helpful guidance.' },
    { name: 'Abdul Aziz S.K', role: 'Integration Architect', description: 'Creating seamless connections between MediBridge and clinic systems, ensuring smooth operations.' },
    { name: 'D. Ramdas', role: 'Healthcare Operations', description: 'Managing partnerships with labs, pharmacies, and clinics to build a trusted healthcare network.' },
    { name: 'Nitika Jain', role: 'Data Security & Compliance', description: 'Ensuring every byte of health data is protected with bank-level security and regulatory compliance.' },
    { name: 'Rohan Balu', role: 'Analytics & Insights', description: 'Turning patient interactions into actionable insights that help clinics serve better.' },
    { name: 'Ashish Chaudhari', role: 'UX Designer', description: 'Crafting interfaces that feel intuitive even for first-time digital users.' },
    { name: 'Kumar Pushpam', role: 'Growth & Partnerships', description: 'Scaling MediBridge across India through strategic clinic and healthcare partnerships.' },
    { name: 'Bharath Harithas', role: 'Customer Success', description: 'Ensuring every patient and clinic has an exceptional experience with MediBridge.' },
  ];

  return (
    <Section id="team" background="white">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Built by Healthcare & AI Experts
        </h2>
        <p className="text-xl text-gray-700">
          A team that understands both technology and the human side of healthcare
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {teamMembers.map((member, index) => (
          <Card key={index} hover>
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center">
                <Users className="w-12 h-12 text-primary-700" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.description}</p>
              </div>
              <button className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors">
                <Linkedin className="w-5 h-5" />
                <span className="text-sm font-medium">Connect</span>
              </button>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <a
          href="#"
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium text-lg"
        >
          <span>Join Our Mission</span>
          <span>→</span>
        </a>
      </div>
    </Section>
  );
}
