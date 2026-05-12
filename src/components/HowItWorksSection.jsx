import React from 'react';
import { Mic, Cpu, Binary, BrainCircuit, LineChart } from 'lucide-react';
import './HowItWorksSection.css';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Mic size={36} color="var(--accent-blue)" />,
      title: "1. Record Voice",
      desc: "User records their voice or uploads an audio file of a specific phonation task."
    },
    {
      icon: <Cpu size={36} color="var(--accent-neon)" />,
      title: "2. Audio Processing",
      desc: "The audio is cleaned, normalized, and processed to remove background noise."
    },
    {
      icon: <Binary size={36} color="var(--accent-purple)" />,
      title: "3. Feature Extraction",
      desc: "Librosa extracts vocal biomarkers like Jitter, Shimmer, and MFCCs."
    },
    {
      icon: <BrainCircuit size={36} color="#ffbd2e" />,
      title: "4. ML Prediction",
      desc: "Our Scikit-learn model analyzes the features against established Parkinson's patterns."
    },
    {
      icon: <LineChart size={36} color="#27c93f" />,
      title: "5. Result Dashboard",
      desc: "Results, confidence scores, and health recommendations are presented."
    }
  ];

  return (
    <section id="how-it-works" className="section how-it-works-section">
      <div className="container">
        <div className="section-title">
          <h2>How It <span className="text-gradient">Works</span></h2>
        </div>
        
        <div className="steps-container">
          <div className="connecting-line"></div>
          {steps.map((step, index) => (
            <div key={index} className="step-card glass-panel">
              <div className="step-icon-wrapper">
                <div className="step-icon">
                  {step.icon}
                </div>
              </div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
