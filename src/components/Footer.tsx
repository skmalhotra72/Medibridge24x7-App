import { Heart, Mail, Phone, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    product: [
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Benefits', href: '#benefits' },
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#faq' },
    ],
    company: [
      { label: 'About Us', href: '#team' },
      { label: 'Team', href: '#team' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#contact' },
    ],
    resources: [
      { label: 'FAQs', href: '#faq' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Blog', href: '#' },
      { label: 'Support', href: '#contact' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Data Security', href: '#' },
      { label: 'Compliance', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-700" fill="currentColor" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">MediBridge</h3>
                <p className="text-xs text-gray-400">Your AI Healthcare Companion</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Bridging the gap between clinics and patients with 24x7 AI-powered healthcare support in your language.
            </p>
            <div className="space-y-2">
              <a href="tel:+919876543210" className="flex items-center space-x-2 text-sm hover:text-primary-400 transition-colors">
                <Phone className="w-4 h-4" />
                <span>+91-9876543210</span>
              </a>
              <a href="mailto:ask@medibridge24x7.com" className="flex items-center space-x-2 text-sm hover:text-primary-400 transition-colors">
                <Mail className="w-4 h-4" />
                <span>ask@medibridge24x7.com</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm hover:text-primary-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm hover:text-primary-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm hover:text-primary-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm hover:text-primary-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2024 MediBridge. All rights reserved.
            </p>

            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
