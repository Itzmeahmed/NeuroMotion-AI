import React from 'react';
import { Activity, Volume2, ShieldAlert, Footprints } from 'lucide-react';
import './AboutSection.css';

const AboutSection = () => {
  const symptoms = [
    {
      icon: <Volume2 size={32} color="var(--accent-blue)" />,
      title: "Speech Difficulty",
      desc: "Changes in speech tone, slurring, or speaking softly."
    },
    {
      icon: <Activity size={32} color="var(--accent-neon)" />,
      title: "Tremors",
      desc: "Involuntary shaking, usually beginning in a limb."
    },
    {
      icon: <ShieldAlert size={32} color="var(--accent-purple)" />,
      title: "Muscle Stiffness",
      desc: "Rigidity in any part of the body, limiting range of motion."
    },
    {
      icon: <Footprints size={32} color="var(--accent-neon)" />,
      title: "Balance Issues",
      desc: "Impaired posture and balance, increasing risk of falls."
    }
  ];

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="section-title">
          <h2>Understanding <span className="text-gradient">Parkinson's</span></h2>
        </div>
        
        <div className="about-content">
          <div className="about-text glass-panel">
            <h3>What is Parkinson's Disease?</h3>
            <p>
              Parkinson's disease is a progressive nervous system disorder that affects movement. 
              Symptoms start gradually, sometimes starting with a barely noticeable tremor in just one hand. 
              Tremors are common, but the disorder also commonly causes stiffness or slowing of movement.
            </p>
            <p>
              Early detection is crucial for managing the symptoms effectively. Our AI model is trained on comprehensive datasets, including the 
              <a href="https://archive.ics.uci.edu/dataset/174/parkinsons" target="_blank" rel="noopener noreferrer" className="dataset-link"> UCI Parkinson's Telemonitoring Dataset</a>,
              to detect vocal biomarkers associated with the disease long before traditional symptoms become severe.
            </p>
          </div>
          
          <div className="symptoms-grid">
            {symptoms.map((symptom, idx) => (
              <div key={idx} className="symptom-card glass-panel">
                <div className="symptom-icon">{symptom.icon}</div>
                <h4>{symptom.title}</h4>
                <p>{symptom.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
