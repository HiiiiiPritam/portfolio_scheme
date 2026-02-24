import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-item" style={{ borderBottom: '1px solid #eee', background: isOpen ? '#fcfcfc' : 'white' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          width: '100%', 
          padding: '20px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer',
          textAlign: 'left'
        }}
      >
        <span style={{ fontWeight: '600', color: 'var(--secondary-blue)', fontSize: '1.05rem', paddingRight: '20px' }}>
          {question}
        </span>
        {isOpen ? <ChevronUp size={20} color="var(--accent-orange)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
      </button>
      {isOpen && (
        <div style={{ padding: '0 20px 20px 20px', color: '#555', lineHeight: '1.8', animation: 'slideDown 0.3s ease-out' }}>
          <div dangerouslySetInnerHTML={{ __html: answer }} />
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      q: "1. What is the official website for registration of students under the GSCC Scheme?",
      a: "Visit official website for the GSCC Scheme on <a href='https://gscc.jharkhand.gov.in' target='_blank'>https://gscc.jharkhand.gov.in</a>"
    },
    {
      q: "2. Will the student get any confirmation after registration in the portal through SMS or e mail?",
      a: "Yes, the student will get an SMS in her/his registered mobile number and an email in his / her registered email id."
    },
    {
      q: "3. Which documents are required to be uploaded at the time of filling up of the online form?",
      a: `The following documents are to be uploaded:<br/>
          1. Coloured Photograph of applicant (50KB-20KB)<br/>
          2. Coloured Photograph of co-borrower (50KB-20KB)<br/>
          3. Signature of student (50KB-10KB)<br/>
          4. AADHAR Card of student (.pdf, 400KB-50KB)<br/>
          5. Class 10TH & 12TH Certificates (.pdf, 400KB-50KB)<br/>
          6. Admission Receipt (.pdf, 400KB-50KB)`
    },
    {
      q: "4. Is there any requirement of furnishing the domicile certificate and Caste certificate?",
      a: "No. There is no need to furnish the copy of domicile certificate and Caste certificate."
    },
    {
      q: "5. Who may I contact if my Institute / Member lending Institution is not helping out?",
      a: "You may contact the State Help Desk (Toll free no.) 18001028014, Support mail ID: contactgscc[at]gmail[dot]com or support-www.gsccjharkhand.com"
    },
    {
      q: "6. What is the maximum amount of loan eligible under the scheme?",
      a: "Maximum amount of loan eligible under the scheme is Rs. 15 (Fifteen) lakhs."
    },
    {
      q: "7. What are the items for which loan can be sought?",
      a: "Fees payable for pursuing education (course/tuition fees), accommodation/hostel fees, mess/food charges (if in fee structure), caution deposit, books/laptop. Up to 30% of total loan can be used for Non-Institutional expenses (rent, travel, etc.)."
    }
  ];

  return (
    <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
      <div className="container">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p style={{ color: '#666', marginTop: '10px' }}>Find answers in our list of frequently asked questions</p>
          <div className="title-underline"></div>
        </div>
        
        <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} question={faq.q} answer={faq.a} />
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p style={{ color: '#777' }}>Didn't find what you were looking for?</p>
          <a href="/contact" style={{ color: 'var(--primary-blue)', fontWeight: '600', textDecoration: 'underline' }}>Contact Support</a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
