import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Section from '../components/Section';
import Button from '../components/Button';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'patient',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', type: 'patient', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Section id="contact" background="white">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Let's Talk Healthcare
            </h2>
            <p className="text-xl text-gray-700">
              Whether you're a patient seeking clarity or a clinic looking to enhance care, we're here to help.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">WhatsApp Support</h3>
                <p className="text-gray-600">+91-9876543210</p>
                <p className="text-sm text-gray-500">24x7 Available</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                <p className="text-gray-600">ask@medibridge24x7.com</p>
                <p className="text-sm text-gray-500">Response within 2 hours</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Headquarters</h3>
                <p className="text-gray-600">Bangalore, India</p>
                <p className="text-sm text-gray-500">Serving patients nationwide</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-accent rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Quick Start</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-accent-600 mt-1">•</span>
                <span>Message us on WhatsApp with your prescription</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-600 mt-1">•</span>
                <span>Get instant medicine explanations in your language</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-600 mt-1">•</span>
                <span>Book labs, order medicines, schedule follow-ups</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center">
                <Send className="w-10 h-10 text-accent-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">Thank You!</h3>
              <p className="text-gray-600">We've received your message and will get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  I am a
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
                  <option value="patient">Patient</option>
                  <option value="clinic">Clinic / Healthcare Provider</option>
                  <option value="lab">Diagnostic Lab</option>
                  <option value="pharmacy">Pharmacy</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full gap-2">
                <Send className="w-5 h-5" />
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
