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
    <section className="banks-section">
      <div className="container">
        <div className="section-header">
          <h2>Member Lending Institutions (MLIs)</h2>
          <p className="section-subtitle">Official list of banks empaneled under the GSCC Scheme</p>
          <div className="title-underline"></div>
        </div>

        <div className="data-card">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search by bank name..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <div className="data-table-wrapper">
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
                    <td className="bank-name-cell">{bank.name}</td>
                    <td><span className="type-badge">{bank.type}</span></td>
                  </tr>
                ))}
                {filteredBanks.length === 0 && (
                  <tr>
                    <td colSpan="3" className="no-results">No banks found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`btn pagination-btn ${currentPage === 1 ? 'disabled' : 'primary'}`}
              >
                <ChevronLeft size={20} />
              </button>
              <span className="page-info">Page {currentPage} of {totalPages}</span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`btn pagination-btn ${currentPage === totalPages ? 'disabled' : 'primary'}`}
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
