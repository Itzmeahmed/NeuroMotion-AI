import React from 'react';
import { Watch, ArrowRight, Activity, Smartphone, Bot } from 'lucide-react';
import './FutureScopeSection.css';

const FutureScopeSection = () => {
  const scopeItems = [
    {
      icon: <Watch size={24} color="var(--accent-neon)" />,
      title: "Smartwatch Integration",
      desc: "Continuous background monitoring of tremors and speech patterns via wearable devices."
    },
    {
      icon: <Smartphone size={24} color="var(--accent-blue)" />,
      title: "Mobile Application",
      desc: "A dedicated mobile app for daily vocal exercises and immediate on-the-go analysis."
    },
    {
      icon: <Bot size={24} color="var(--accent-purple)" />,
      title: "AI Doctor Assistant",
      desc: "An intelligent virtual assistant to guide patients through symptoms and provide preliminary advice."
    }
  ];

  return (
    <section className="section future-section">
      <div className="container">
        <div className="future-content glass-panel">
          <div className="future-text">
            <h2>The <span className="text-gradient">Future</span> of NeuroMotion AI</h2>
            <p>
              We are constantly evolving our platform to provide more comprehensive, accessible, and continuous care for individuals at risk of or living with Parkinson's disease.
            </p>
            <div className="scope-list">
              {scopeItems.map((item, idx) => (
                <div key={idx} className="scope-item">
                  <div className="scope-icon">{item.icon}</div>
                  <div className="scope-details">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="future-visual">
            <div className="abstract-shape"></div>
            <div className="watch-mockup glass-panel">
              <div className="watch-screen">
                <Activity size={32} color="var(--accent-neon)" />
                <span className="watch-time">08:42</span>
                <div className="watch-graph"></div>
                <span className="watch-status">Status: Normal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureScopeSection;
