import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const Banks = () => {
  const allBanks = [
    "Airtel Payments Bank", "AU Small Finance Bank", "Axis Bank Ltd", "Bandhan Bank", 
    "Bank of Baroda", "Bank of India", "Bank of Maharashtra", "Canara Bank", 
    "Central Bank of India", "DBS Bank", "Dhanbad Central Co-op. Bank", 
    "ESAF Small Finance Bank Limited", "Federal Bank Ltd", "Fino Payments Bank", 
    "HDFC Bank Ltd", "ICICI Bank Ltd", "IDBI Bank Ltd", "IDFC First Bank Limited", 
    "Indian Bank", "Indian Overseas Bank", "India Post Payments Bank", "IndusInd Bank", 
    "Jammu & Kashmir Bank Ltd", "Jana Small Finance Bank", "Jharkhand Rajya Gramin Bank", 
    "Jharkhand State Cooperative Bank Ltd", "Karnataka Bank Ltd", "Karur Vysya Bank", 
    "Kotak Mahindra Bank Ltd", "Punjab and Sind Bank", "Punjab National Bank", 
    "South Indian Bank Ltd", "State Bank of India", "UCO Bank", 
    "Ujjivan Small Finance Bank", "Union Bank of India", "Utkarsh Small Finance Bank Limited", "YES Bank"
  ].map((name, idx) => ({ id: idx + 1, name, type: name.includes('Small Finance') ? 'SFB' : name.includes('Payments') ? 'Payments' : 'Scheduled Commercial' }));

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredBanks = allBanks.filter(bank => 
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBanks.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBanks.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section style={{ padding: '80px 0', background: '#fff' }}>
      <div className="container">
        <div className="section-header">
          <h2>Member Lending Institutions (MLIs)</h2>
          <p style={{ color: '#666' }}>Official list of banks empaneled under the GSCC Scheme</p>
          <div className="title-underline"></div>
        </div>

        <div style={{ background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
          <div style={{ marginBottom: '25px', position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} size={20} />
            <input 
              type="text" 
              placeholder="Search by bank name..." 
              style={{ width: '100%', padding: '15px 15px 15px 50px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Sr. No.</th>
                <th>Bank Name</th>
                <th>Institution Type</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((bank, i) => (
                <tr key={bank.id}>
                  <td>{indexOfFirstItem + i + 1}</td>
                  <td style={{ fontWeight: '600', color: 'var(--secondary-blue)' }}>{bank.name}</td>
                  <td><span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', background: '#eef2f7', color: '#555' }}>{bank.type}</span></td>
                </tr>
              ))}
              {filteredBanks.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '40px', color: '#888' }}>No banks found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '30px' }}>
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="btn"
                style={{ background: currentPage === 1 ? '#eee' : 'var(--primary-blue)', color: currentPage === 1 ? '#999' : '#fff', padding: '8px 15px' }}
              >
                <ChevronLeft size={20} />
              </button>
              <span style={{ fontWeight: '600' }}>Page {currentPage} of {totalPages}</span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="btn"
                style={{ background: currentPage === totalPages ? '#eee' : 'var(--primary-blue)', color: currentPage === totalPages ? '#999' : '#fff', padding: '8px 15px' }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Banks;
