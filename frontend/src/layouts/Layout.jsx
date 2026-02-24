import { NavLink, Link, Outlet } from 'react-router-dom';
import { Globe, Accessibility, Search, MapPin, Phone, Mail, ChevronRight, Facebook, Twitter, Instagram, ExternalLink, Menu, X } from 'lucide-react';
import ChatWidget from '../components/ChatWidget';
import logoJh from '../assets/cheat1.png';
import logoGscc from '../assets/cheat2.png';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="site-wrapper">
      {/* Top Bar */}
      <div className="top-bar desktop-only">
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
              <p className="desktop-only">Department of Higher and Technical Education</p>
            </div>
            
          </Link>

          <button 
            className="mobile-only menu-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className={`nav-menu ${isMenuOpen ? 'mobile-nav-active' : ''}`}>
            <NavLink to="/" end onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About Scheme</NavLink>
            <NavLink to="/institutions" onClick={() => setIsMenuOpen(false)}>Institutions</NavLink>
            <NavLink to="/banks" onClick={() => setIsMenuOpen(false)}>Banks</NavLink>
            <NavLink to="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</NavLink>
            <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</NavLink>
            <div className="mobile-only mobile-auth-buttons">
              <a href="https://gscc.jharkhand.gov.in/Student/Student" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Login</a>
              <a href="https://gscc.jharkhand.gov.in/Student/Student/Registration" target="_blank" rel="noopener noreferrer" className="btn btn-accent">Registration</a>
            </div>
          </nav>

          <div className="desktop-only header-buttons">
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
