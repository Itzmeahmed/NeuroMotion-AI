import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import HowItWorksSection from './components/HowItWorksSection';
import VoiceAnalysisSection from './components/VoiceAnalysisSection';
import PatientRecordsSection from './components/PatientRecordsSection';
import FeaturesSection from './components/FeaturesSection';
import TechStackSection from './components/TechStackSection';
import FutureScopeSection from './components/FutureScopeSection';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <HowItWorksSection />
        <VoiceAnalysisSection />
        <PatientRecordsSection />
        <FeaturesSection />
        <TechStackSection />
        <FutureScopeSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
