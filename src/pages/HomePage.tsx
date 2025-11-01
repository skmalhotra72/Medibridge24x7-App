import { useState } from 'react';
import Hero from '../sections/Hero';
import Problem from '../sections/Problem';
import Solution from '../sections/Solution';
import HowItWorks from '../sections/HowItWorks';
import Benefits from '../sections/Benefits';
import PatientStory from '../sections/PatientStory';
import Testimonials from '../sections/Testimonials';
import Features from '../sections/Features';
import Trust from '../sections/Trust';
import ForClinics from '../sections/ForClinics';
import Technology from '../sections/Technology';
import Team from '../sections/Team';
import FAQ from '../sections/FAQ';
import Contact from '../sections/Contact';
import UploadModal from '../components/UploadModal';

interface HomePageProps {
  onUploadClick: () => void;
}

export default function HomePage({ onUploadClick }: HomePageProps) {
  return (
    <>
      <Hero onUploadClick={onUploadClick} />
      <Problem />
      <Solution />
      <HowItWorks />
      <Benefits />
      <PatientStory onUploadClick={onUploadClick} />
      <Testimonials />
      <Features />
      <Trust />
      <ForClinics />
      <Technology />
      <Team />
      <FAQ />
      <Contact />
    </>
  );
}
