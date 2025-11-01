import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Section from '../components/Section';
import Card from '../components/Card';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      rating: 5,
      text: 'After my consultation, I had so many questions about my medicines. MediBridge explained everything in Hindi - the dosage, timing, even what foods to avoid. I felt like I had a nurse at home!',
      author: 'Priya Sharma',
      role: 'Delhi Patient',
    },
    {
      rating: 5,
      text: 'We were losing patients to bigger hospitals because we couldn\'t provide after-hours support. MediBridge solved that. Our satisfaction scores went up 40% in 3 months, and we\'re retaining diagnostic revenue.',
      author: 'Dr. Rajesh Mehta',
      role: 'Pune Clinic Owner',
    },
    {
      rating: 5,
      text: 'I compared lab prices and saved ₹600 on my blood tests! Plus, the home collection was so convenient. MediBridge made healthcare affordable and stress-free.',
      author: 'Anjali Desai',
      role: 'Bangalore Patient',
    },
    {
      rating: 5,
      text: 'My patients are more informed and adherent to treatment now. They understand their medications better, which leads to better outcomes. And I don\'t get 10 PM calls anymore!',
      author: 'Dr. Amit Singh',
      role: 'Mumbai General Physician',
    },
    {
      rating: 5,
      text: 'My parents don\'t speak English well, and doctors often use complex terms. MediBridge translates everything to Tamil and explains it simply. It\'s like having a family doctor who\'s always available.',
      author: 'Karthik Ramesh',
      role: 'Chennai Patient',
    },
    {
      rating: 5,
      text: 'Partnering with MediBridge increased our home collection bookings by 200%. The seamless integration and automated scheduling make operations smooth.',
      author: 'PathLabs Partner',
      role: 'Hyderabad Diagnostic Partner',
    },
  ];

  const visibleCount = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return visible;
  };

  return (
    <Section id="testimonials" background="white">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Healthcare That Feels Human
        </h2>
        <p className="text-xl text-gray-700">
          Trusted by patients and doctors across India
        </p>
      </div>

      <div className="relative">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {getVisibleTestimonials().map((testimonial, index) => (
            <Card key={index} className="h-full">
              <div className="flex flex-col h-full">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 flex-grow">"{testimonial.text}"</p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={handlePrevious}
            className="p-2 rounded-full bg-primary-100 hover:bg-primary-200 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-primary-700" />
          </button>

          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-primary-600 w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-primary-100 hover:bg-primary-200 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-primary-700" />
          </button>
        </div>
      </div>
    </Section>
  );
}
