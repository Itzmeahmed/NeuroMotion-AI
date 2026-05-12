import React from 'react';
import './TechStackSection.css';

const TechStackSection = () => {
  const stack = [
    { name: "React.js", category: "Frontend" },
    { name: "Flask", category: "Backend API" },
    { name: "Python", category: "Core Logic" },
    { name: "Scikit-learn", category: "Machine Learning" },
    { name: "Librosa", category: "Audio Processing" },
    { name: "MongoDB", category: "Database" }
  ];

  return (
    <section id="tech-stack" className="section tech-stack-section">
      <div className="container">
        <div className="section-title">
          <h2>Our <span className="text-gradient">Technology</span> Stack</h2>
        </div>
        
        <div className="stack-grid">
          {stack.map((tech, idx) => (
            <div key={idx} className="tech-badge glass-panel">
              <span className="tech-category">{tech.category}</span>
              <h3 className="tech-name">{tech.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
