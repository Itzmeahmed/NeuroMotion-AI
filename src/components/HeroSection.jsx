import React from 'react';
import { Brain, ArrowRight } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="bg-glow" style={{ top: '10%', left: '-10%' }}></div>
      <div className="bg-glow" style={{ bottom: '10%', right: '-10%', background: 'var(--accent-neon)' }}></div>
      
      <div className="container hero-container">
        <div className="hero-content">
          <div className="badge glass-panel">
            <Brain size={18} color="var(--accent-neon)" />
            <span>AI-Powered Healthcare</span>
          </div>
          
          <h1 className="hero-title">
            Early Parkinson's Detection using <span className="text-gradient">Voice Analysis</span>
          </h1>
          
          <p className="hero-subtitle">
            NeuroMotion AI utilizes advanced machine learning algorithms to detect early signs of Parkinson's Disease through non-invasive audio analysis, empowering proactive healthcare.
          </p>
          
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => document.getElementById('analysis').scrollIntoView({ behavior: 'smooth' })}>
              Start Voice Analysis <ArrowRight size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
            </button>
            <button className="btn-secondary" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
              Learn More
            </button>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="glass-panel main-dashboard-mock">
            <div className="mock-header">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
            </div>
            <div className="mock-body">
              <div className="waveform-animation">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="bar" style={{ animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
              <div className="mock-stats">
                <div className="stat-card">
                  <span className="stat-label">Model Accuracy</span>
                  <span className="stat-value text-gradient">94.8%</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Processing Time</span>
                  <span className="stat-value">2.4s</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="floating-element glass-panel el-1">
            <ActivityIcon />
            <span>Real-time Analysis</span>
          </div>
          <div className="floating-element glass-panel el-2">
            <MicrophoneIcon />
            <span>Vocal Biomarkers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// SVG Icons for floating elements
const ActivityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-neon)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const MicrophoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" x2="12" y1="19" y2="22"></line>
  </svg>
);

export default HeroSection;
