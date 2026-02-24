import React from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { Globe, Accessibility, Search, MapPin, Phone, Mail, ChevronRight, Facebook, Twitter, Instagram, ExternalLink } from 'lucide-react';
import ChatWidget from '../components/ChatWidget';
import logoJh from '../assets/cheat1.png';
import logoGscc from '../assets/cheat2.png';

const Layout = () => {
  return (
    <div className="site-wrapper">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-left">
            <span>Government of Jharkhand</span>
          </div>
          <div className="top-bar-right top-bar-links">
            <a href="#"><Globe size={14} /> English</a>
            <a href="#"><Accessibility size={14} /> Screen Reader</a>
            <a href="#"><Search size={14} /></a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="container header-content">
          <Link to="/" className="logo-section">
            <img 
              src={logoGscc} 
              alt="Jharkhand Logo" 
              className="emblem"
            />
            <div className="logo-text">
              <h1>Guruji Student Credit Card Scheme</h1>
              <p>Department of Higher and Technical Education</p>
            </div>
            
          </Link>

          <nav className="nav-menu">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/about">About Scheme</NavLink>
            <NavLink to="/institutions">Institutions</NavLink>
            <NavLink to="/banks">Banks</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
          </nav>

          <div style={{ display: 'flex', gap: '10px' }}>
            <a href="https://gscc.jharkhand.gov.in/Student/Student" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Login</a>
            <a href="https://gscc.jharkhand.gov.in/Student/Student/Registration" target="_blank" rel="noopener noreferrer" className="btn btn-accent">Registration</a>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-main">
            <div className="footer-col">
              <h4>About Scheme</h4>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.7' }}>
                The GSCC project is an overarching goal of the State Government to guarantee that every student has the chance to access higher education in top institutions.
              </p>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/"><ChevronRight size={14} /> Home</Link></li>
                <li><Link to="/about"><ChevronRight size={14} /> About Us</Link></li>
                <li><Link to="/faq"><ChevronRight size={14} /> Frequently Asked Questions</Link></li>
                <li><Link to="/contact"><ChevronRight size={14} /> Contact Us</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Important Links</h4>
              <ul className="footer-links">
                <li><a href="https://www.jharkhand.gov.in" target="_blank"><ExternalLink size={14} /> State Portal</a></li>
                <li><a href="https://education.jharkhand.gov.in" target="_blank"><ExternalLink size={14} /> Higher Education</a></li>
                <li><a href="#"><ChevronRight size={14} /> Privacy Policy</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact Info</h4>
              <p style={{ display: 'flex', gap: '8px', fontSize: '0.9rem', marginBottom: '10px' }}>
                <MapPin size={24} />
                Guruji Student Credit Card Cell,<br />
                Yojna Bhawan, Nepal House Complex,<br />
                Doranda, Ranchi - 834002
              </p>
              <p style={{ display: 'flex', gap: '8px', fontSize: '0.9rem' }}>
                <Phone size={16} /> 18001028014
              </p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #333', paddingTop: '30px', textAlign: 'center', fontSize: '0.85rem' }}>
            <p>© 2024 Guruji Student Credit Card Scheme (GSCCS). Government of Jharkhand.</p>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
};

export default Layout;
