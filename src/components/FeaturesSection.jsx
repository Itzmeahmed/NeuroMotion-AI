import React from 'react';
import { ActivitySquare, HeartPulse, Clock, Brain, FileText, Smartphone } from 'lucide-react';
import './FeaturesSection.css';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Brain size={32} color="var(--accent-neon)" />,
      title: "AI Detection",
      desc: "Advanced neural networks capable of identifying minute vocal biomarkers invisible to the human ear."
    },
    {
      icon: <HeartPulse size={32} color="var(--accent-blue)" />,
      title: "Health Analytics",
      desc: "Comprehensive breakdown of your vocal health metrics compared against clinical baselines."
    },
    {
      icon: <Clock size={32} color="var(--accent-purple)" />,
      title: "Real-Time Monitoring",
      desc: "Track the progression or stability of symptoms over time with historical data logging."
    },
    {
      icon: <FileText size={32} color="#ffbd2e" />,
      title: "Clinical Reports",
      desc: "Generate detailed, exportable reports that you can share directly with your healthcare provider."
    },
    {
      icon: <ActivitySquare size={32} color="#27c93f" />,
      title: "Smart Recommendations",
      desc: "Personalized actionable insights and next steps based on your specific analysis results."
    },
    {
      icon: <Smartphone size={32} color="#ff5f56" />,
      title: "Accessible Everywhere",
      desc: "Seamlessly analyze your voice from any device—desktop, tablet, or mobile phone."
    }
  ];

  return (
    <section id="features" className="section features-section">
      <div className="container">
        <div className="section-title">
          <h2>Platform <span className="text-gradient">Features</span></h2>
        </div>
        
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card glass-panel">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
              <div className="card-glow"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
