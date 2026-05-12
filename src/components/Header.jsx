import React, { useState, useEffect } from 'react';
import { Activity, Menu, X } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <div className="logo">
          <Activity color="var(--accent-neon)" size={32} />
          <span className="logo-text">NeuroMotion <span className="text-gradient">AI</span></span>
        </div>
        
        <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
          <a href="#records" onClick={() => setMobileMenuOpen(false)}>Records</a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#tech-stack" onClick={() => setMobileMenuOpen(false)}>Tech Stack</a>
          <button className="btn-primary nav-btn" onClick={() => {
            document.getElementById('analysis').scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
          }}>
            Analyze Voice
          </button>
        </nav>

        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
