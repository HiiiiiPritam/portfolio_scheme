import React from 'react';
import { Target, ShieldCheck, Clock, Award, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div style={{ background: '#fff' }}>
      {/* Page Header */}
      <section className="page-header about-header">
        <div className="container">
          <h2>About the Scheme</h2>
          <p>Know more about the vision and highlights of the Guruji Student Credit Card Scheme.</p>
        </div>
      </section>

      <section className="about-details-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-vision">
              <div className="vision-header">
                <div className="vision-icon-box">
                  <Target size={32} color="var(--accent-orange)" />
                </div>
                <h3>Vision & Mission</h3>
              </div>
              <p className="vision-text">
                The Guruji Student Credit Card (GSCC) Scheme is a visionary project by the Government of Jharkhand aimed at ensuring that no student in the state is deprived of higher education due to financial constraints.
              </p>
              <p className="vision-text">
                The scheme provides a collateral-free, full guaranteed education loan up to <strong>₹15 Lakhs</strong> to students who have completed their Class 10th or 12th from recognized institutions in Jharkhand.
              </p>
            </div>
            <div className="highlights-card">
              <h4 className="highlights-title">Quick Highlights</h4>
              <ul className="highlights-list">
                <li className="highlight-item">
                  <ShieldCheck color="var(--gov-green)" />
                  <div className="highlight-text">
                    <strong>Collateral Free</strong>
                    <p>No security or third-party guarantee required.</p>
                  </div>
                </li>
                <li className="highlight-item">
                  <Award color="var(--accent-orange)" />
                  <div className="highlight-text">
                    <strong>4% Simple Interest</strong>
                    <p>Nominal interest with 1% concession for early service.</p>
                  </div>
                </li>
                <li className="highlight-item">
                  <Clock color="var(--primary-blue)" />
                  <div className="highlight-text">
                    <strong>15 Year Tenure</strong>
                    <p>Long repayment period including 1-year moratorium.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="eligibility-section">
        <div className="container">
          <div className="section-header">
            <h2>Eligibility Criteria</h2>
            <div className="title-underline"></div>
          </div>
          
          <div className="eligibility-grid">
            {[
              "Must be an Indian national and permanent resident of Jharkhand.",
              "Completed Class 10th (for Diploma) or 10th & 12th from a recognized school in Jharkhand.",
              "Secured admission in institutions ranked up to 200 in NIRF Overall or up to 100 in category.",
              "Age should not be more than 40 years at the time of application.",
              "Should not have availed any other state-sponsored education loan for the same course."
            ].map((text, i) => (
              <div key={i} className="eligibility-card">
                <div className="check-icon"><CheckCircle color="var(--primary-blue)" size={24} /></div>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="closing-section">
        <div className="container">
          <h3 className="closing-title">Empowering Dreams, Shaping Futures</h3>
          <p className="closing-text">
            GSCC is not just a loan; it's a promise from the government to stand by the students who aspire to change the world through education.
          </p>
          <a href="/contact" className="btn btn-primary contact-btn">Contact Nodal Officers</a>
        </div>
      </section>
    </div>
  );
};

export default About;
