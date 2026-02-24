import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Contact = () => {
  const nodalOfficers = [
    { district: "Ranchi", name: "Shri A.K. Sharma", email: "ranchi.gscc@jharkhand.gov.in", contact: "1800-123-4455" },
    { district: "Jamshedpur", name: "Smt. Priya Singh", email: "jamshedpur.gscc@jharkhand.gov.in", contact: "1800-123-4456" },
    { district: "Dhanbad", name: "Shri Rajesh Kumar", email: "dhanbad.gscc@jharkhand.gov.in", contact: "1800-123-4457" },
    { district: "Hazaribagh", name: "Shri Sunil Verma", email: "hazaribagh.gscc@jharkhand.gov.in", contact: "1800-123-4458" },
    { district: "Bokaro", name: "Smt. Meera Das", email: "bokaro.gscc@jharkhand.gov.in", contact: "1800-123-4459" },
    { district: "Deoghar", name: "Shri V.K. Singh", email: "deoghar.gscc@jharkhand.gov.in", contact: "1800-123-4460" }
  ];

  return (
    <section style={{ padding: '80px 0', background: '#fff' }}>
      <div className="container">
        <div className="section-header">
          <h2>Contact Us</h2>
          <div className="title-underline"></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginBottom: '60px' }}>
          <div style={{ padding: '30px', textAlign: 'center', background: '#f8f9fa', borderRadius: '10px' }}>
            <Phone size={32} color="var(--primary-blue)" style={{ marginBottom: '15px' }} />
            <h4 style={{ marginBottom: '10px' }}>Toll Free Helpline</h4>
            <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--primary-blue)' }}>18001028014</p>
            <p style={{ fontSize: '0.85rem', color: '#666' }}>10:00 AM to 06:00 PM (Mon-Sat)</p>
          </div>
          <div style={{ padding: '30px', textAlign: 'center', background: '#f8f9fa', borderRadius: '10px' }}>
            <Mail size={32} color="var(--primary-blue)" style={{ marginBottom: '15px' }} />
            <h4 style={{ marginBottom: '10px' }}>Support Email</h4>
            <p style={{ fontWeight: 'bold', color: 'var(--primary-blue)' }}>contactgscc@gmail.com</p>
            <p style={{ fontWeight: 'bold', color: 'var(--primary-blue)' }}>support.gscc@jharkhand.gov.in</p>
          </div>
          <div style={{ padding: '30px', textAlign: 'center', background: '#f8f9fa', borderRadius: '10px' }}>
            <MapPin size={32} color="var(--primary-blue)" style={{ marginBottom: '15px' }} />
            <h4 style={{ marginBottom: '10px' }}>Address</h4>
            <p style={{ color: '#444' }}>Nepal House Complex, Doranda,<br />Ranchi, Jharkhand - 834002</p>
          </div>
        </div>

        <h3 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--secondary-blue)' }}>District Nodal Officers</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>District</th>
                <th>Nodal Officer Name</th>
                <th>Email ID</th>
                <th>Contact Number</th>
              </tr>
            </thead>
            <tbody>
              {nodalOfficers.map((officer, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: '600' }}>{officer.district}</td>
                  <td>{officer.name}</td>
                  <td style={{ color: 'var(--primary-blue)' }}>{officer.email}</td>
                  <td>{officer.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Contact;
