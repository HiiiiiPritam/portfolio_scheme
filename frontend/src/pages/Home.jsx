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
            <div style={{ display: 'flex', gap: '15px', marginTop: '150px' }}>
              <a href="https://gscc.jharkhand.gov.in/Student/Student" target="_blank" rel="noopener noreferrer" className="btn btn-accent" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                Apply Now <ArrowRight size={18} style={{ marginLeft: '5px' }} />
              </a>
              <Link to="/about" className="btn" style={{ background: 'white', color: 'var(--primary-blue)', textDecoration: 'none' }}>
                Know More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <div className="stats-banner">
        <div className="container stats-grid" style={{ color: '#24394dff' }}>
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
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <div className="section-header">
            <h2>Application Process</h2>
            <p style={{ color: '#666' }}>Simple steps to secure your educational future</p>
            <div className="title-underline"></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            <div style={{ background: '#f8f9fa', padding: '40px', borderRadius: '10px', textAlign: 'center', border: '1px solid #eee' }}>
              <div style={{ color: 'var(--primary-blue)', marginBottom: '20px' }}><UserCheck size={48} /></div>
              <h3 style={{ marginBottom: '15px', color: 'var(--secondary-blue)' }}>1. Check Eligibility</h3>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>Indian national, completed Class 10th in Jharkhand, and secured admission in ranked institutions.</p>
            </div>
            <div style={{ background: '#f8f9fa', padding: '40px', borderRadius: '10px', textAlign: 'center', border: '1px solid #eee' }}>
              <div style={{ color: 'var(--primary-blue)', marginBottom: '20px' }}><FileText size={48} /></div>
              <h3 style={{ marginBottom: '15px', color: 'var(--secondary-blue)' }}>2. Documentation</h3>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>Upload Aadhar, Class 10/12 certificates, admission receipt, and co-borrower details.</p>
            </div>
            <div style={{ background: '#f8f9fa', padding: '40px', borderRadius: '10px', textAlign: 'center', border: '1px solid #eee' }}>
              <div style={{ color: 'var(--primary-blue)', marginBottom: '20px' }}><Landmark size={48} /></div>
              <h3 style={{ marginBottom: '15px', color: 'var(--secondary-blue)' }}>3. Sanctioning</h3>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>Member Lending Institutions (Banks) process and approve your loan with state guarantee.</p>
            </div>
            <div style={{ background: '#f8f9fa', padding: '40px', borderRadius: '10px', textAlign: 'center', border: '1px solid #eee' }}>
              <div style={{ color: 'var(--primary-blue)', marginBottom: '20px' }}><RefreshCw size={48} /></div>
              <h3 style={{ marginBottom: '15px', color: 'var(--secondary-blue)' }}>4. Disbursement</h3>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>Loan disbursed directly for tuition, hostel, and other educational expenses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About the Scheme Summary */}
      <section style={{ padding: '80px 0', background: '#ffffffff' }}>
        <div className="container" style={{ display: 'flex', gap: '50px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <img 
              src={logoJh3} 
              alt="About GSCC" 
              style={{ width: '100%', borderRadius: '10px' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: 'var(--secondary-blue)', fontSize: '2rem', marginBottom: '20px' }}>What is the Guruji Student Credit Card Scheme?</h2>
            <p style={{ marginBottom: '20px', color: '#444' }}>
              The objective of this scheme is to offer financial aid from the State Government to students who have successfully completed their education in organized schools within Jharkhand. This assistance entails nominal interest rates, accompanied by appropriate guarantees to the bank.
            </p>
            <p style={{ marginBottom: '30px', color: '#444' }}>
              Loans up to ₹15 Lakhs are provided at 4% simple interest with a 15-year repayment period and a 1-year moratorium.
            </p>
            <a 
              href="https://gscc.jharkhand.gov.in/sample%20files/guruji_guidelines.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
              style={{ textDecoration: 'none', display: 'inline-block' }}
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
