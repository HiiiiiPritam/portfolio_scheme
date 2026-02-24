import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserCheck, FileText, Landmark, RefreshCw, ArrowRight } from 'lucide-react';
import logoJh from '../assets/cheat1.png';
import logoJh2 from '../assets/cheat3.jpg';
import logoJh3 from '../assets/cheat4.png';

const Home = () => {
  const images = [logoJh, logoJh2];
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 5000); // Slide every 5 seconds
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <>
      {/* Hero Section */}
      <section 
        className="hero" 
        style={{ 
          backgroundImage: `url(${images[currentIdx]})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          transition: 'background-image 1s ease-in-out'
        }}
      >
        <div className="container">
          <div className="hero-content">
            <div className="hero-actions">
              <a href="https://gscc.jharkhand.gov.in/Student/Student" target="_blank" rel="noopener noreferrer" className="btn btn-accent apply-btn">
                Apply Now <ArrowRight size={18} style={{ marginLeft: '5px' }} />
              </a>
              <Link to="/about" className="btn know-more-btn">
                Know More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <div className="stats-banner">
        <div className="container stats-grid">
          <div className="stat-box">
            <h3>49,162</h3>
            <p>Applications Received</p>
          </div>
          <div className="stat-box">
            <h3>41,205</h3>
            <p>Credit Cards Issued</p>
          </div>
          <div className="stat-box">
            <h3>₹ 2500 Cr+</h3>
            <p>Total Loan Amount</p>
          </div>
          <div className="stat-box">
            <h3>200+</h3>
            <p>Empaneled Institutes</p>
          </div>
        </div>
      </div>

      {/* Application Process */}
      <section className="application-process">
        <div className="container">
          <div className="section-header">
            <h2>Application Process</h2>
            <p className="section-subtitle">Simple steps to secure your educational future</p>
            <div className="title-underline"></div>
          </div>

          <div className="process-grid">
            <div className="process-card">
              <div className="process-icon"><UserCheck size={48} /></div>
              <h3 className="process-title">1. Check Eligibility</h3>
              <p className="process-desc">Indian national, completed Class 10th in Jharkhand, and secured admission in ranked institutions.</p>
            </div>
            <div className="process-card">
              <div className="process-icon"><FileText size={48} /></div>
              <h3 className="process-title">2. Documentation</h3>
              <p className="process-desc">Upload Aadhar, Class 10/12 certificates, admission receipt, and co-borrower details.</p>
            </div>
            <div className="process-card">
              <div className="process-icon"><Landmark size={48} /></div>
              <h3 className="process-title">3. Sanctioning</h3>
              <p className="process-desc">Member Lending Institutions (Banks) process and approve your loan with state guarantee.</p>
            </div>
            <div className="process-card">
              <div className="process-icon"><RefreshCw size={48} /></div>
              <h3 className="process-title">4. Disbursement</h3>
              <p className="process-desc">Loan disbursed directly for tuition, hostel, and other educational expenses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About the Scheme Summary */}
      <section className="about-summary">
        <div className="container about-summary-content">
          <div className="about-image-wrapper">
            <img 
              src={logoJh3} 
              alt="About GSCC" 
              className="about-image"
            />
          </div>
          <div className="about-text-content">
            <h2 className="about-title">What is the Guruji Student Credit Card Scheme?</h2>
            <p className="about-desc">
              The objective of this scheme is to offer financial aid from the State Government to students who have successfully completed their education in organized schools within Jharkhand. This assistance entails nominal interest rates, accompanied by appropriate guarantees to the bank.
            </p>
            <p className="about-desc">
              Loans up to ₹15 Lakhs are provided at 4% simple interest with a 15-year repayment period and a 1-year moratorium.
            </p>
            <a 
              href="https://gscc.jharkhand.gov.in/sample%20files/guruji_guidelines.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary download-btn"
            >
              Download Guidelines (PDF)
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
