import React from 'react';
import { Activity, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <Activity color="var(--accent-neon)" size={28} />
              <span className="logo-text">NeuroMotion <span className="text-gradient">AI</span></span>
            </div>
            <p className="footer-desc">
              Pioneering early Parkinson's disease detection through the power of artificial intelligence and voice analysis.
            </p>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#about">About Parkinson's</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#analysis">Voice Analysis</a></li>
              <li><a href="#records">Patient Records</a></li>
              <li><a href="#features">Features</a></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h4>Contact</h4>
            <a href="mailto:contact@neuromotion.ai" className="contact-link">
              <Mail size={18} /> contact@neuromotion.ai
            </a>
            <div className="social-icons">
              <a href="#" className="social-icon"><Github size={20} /></a>
              <a href="#" className="social-icon"><Twitter size={20} /></a>
              <a href="#" className="social-icon"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} NeuroMotion AI. All rights reserved.</p>
          <p className="creator-credit">Designed & Built by Project Creator</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
