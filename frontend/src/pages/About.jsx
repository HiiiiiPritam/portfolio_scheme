import React from 'react';
import { Target, ShieldCheck, Clock, Award, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div style={{ background: '#fff' }}>
      {/* Page Header */}
      <section style={{ padding: '60px 0', background: 'linear-gradient(135deg, var(--primary-blue) 0%, #003366 100%)', color: 'white' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>About the Scheme</h2>
          <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>Know more about the vision and highlights of the Guruji Student Credit Card Scheme.</p>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <div style={{ padding: '10px', background: 'rgba(243, 112, 33, 0.1)', borderRadius: '10px' }}>
                  <Target size={32} color="var(--accent-orange)" />
                </div>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--secondary-blue)' }}>Vision & Mission</h3>
              </div>
              <p style={{ fontSize: '1.05rem', color: '#444', lineHeight: '1.8', marginBottom: '20px' }}>
                The Guruji Student Credit Card (GSCC) Scheme is a visionary project by the Government of Jharkhand aimed at ensuring that no student in the state is deprived of higher education due to financial constraints.
              </p>
              <p style={{ fontSize: '1.05rem', color: '#444', lineHeight: '1.8' }}>
                The scheme provides a collateral-free, full guaranteed education loan up to <strong>₹15 Lakhs</strong> to students who have completed their Class 10th or 12th from recognized institutions in Jharkhand.
              </p>
            </div>
            <div style={{ background: '#f8f9fa', padding: '40px', borderRadius: '20px', boxShadow: '0 15px 35px rgba(0,0,0,0.05)' }}>
              <h4 style={{ fontSize: '1.3rem', color: 'var(--primary-blue)', marginBottom: '25px', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>Quick Highlights</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <li style={{ display: 'flex', gap: '15px' }}>
                  <ShieldCheck color="var(--gov-green)" />
                  <div>
                    <strong>Collateral Free</strong>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>No security or third-party guarantee required.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '15px' }}>
                  <Award color="var(--accent-orange)" />
                  <div>
                    <strong>4% Simple Interest</strong>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>Nominal interest with 1% concession for early service.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '15px' }}>
                  <Clock color="var(--primary-blue)" />
                  <div>
                    <strong>15 Year Tenure</strong>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>Long repayment period including 1-year moratorium.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: '#f4f7f9' }}>
        <div className="container">
          <div className="section-header">
            <h2>Eligibility Criteria</h2>
            <div className="title-underline"></div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '50px' }}>
            {[
              "Must be an Indian national and permanent resident of Jharkhand.",
              "Completed Class 10th (for Diploma) or 10th & 12th from a recognized school in Jharkhand.",
              "Secured admission in institutions ranked up to 200 in NIRF Overall or up to 100 in category.",
              "Age should not be more than 40 years at the time of application.",
              "Should not have availed any other state-sponsored education loan for the same course."
            ].map((text, i) => (
              <div key={i} style={{ background: 'white', padding: '30px', borderRadius: '15px', display: 'flex', gap: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.02)' }}>
                <div style={{ minWidth: '30px' }}><CheckCircle color="var(--primary-blue)" size={24} /></div>
                <p style={{ fontSize: '1rem', color: '#444' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', color: 'var(--secondary-blue)', marginBottom: '30px' }}>Empowering Dreams, Shaping Futures</h3>
          <p style={{ maxWidth: '800px', margin: '0 auto 40px', color: '#666', fontSize: '1.1rem' }}>
            GSCC is not just a loan; it's a promise from the government to stand by the students who aspire to change the world through education.
          </p>
          <a href="/contact" className="btn btn-primary" style={{ padding: '15px 40px' }}>Contact Nodal Officers</a>
        </div>
      </section>
    </div>
  );
};

export default About;
