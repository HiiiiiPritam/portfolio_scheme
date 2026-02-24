import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';

const Institutions = () => {
  const allInstitutes = [
    { name: "Indian Institute of Technology (IIT), Delhi", location: "New Delhi", category: "Engineering" },
    { name: "Indian Institute of Technology (IIT), Bombay", location: "Mumbai", category: "Engineering" },
    { name: "Indian Institute of Technology (IIT), Kharagpur", location: "Kharagpur", category: "Engineering" },
    { name: "Indian Institute of Management (IIM), Ranchi", location: "Ranchi, Jharkhand", category: "Management" },
    { name: "National Institute of Technology (NIT), Jamshedpur", location: "Jamshedpur, Jharkhand", category: "Engineering" },
    { name: "Birla Institute of Technology (BIT), Mesra", location: "Ranchi, Jharkhand", category: "Engineering/Tech" },
    { name: "Xavier School of Management (XLRI)", location: "Jamshedpur, Jharkhand", category: "Management" },
    { name: "Indian School of Mines (IIT-ISM), Dhanbad", location: "Dhanbad, Jharkhand", category: "Engineering" },
    { name: "Ranchi University", location: "Ranchi, Jharkhand", category: "University" },
    { name: "Kolhan University", location: "Chaibasa, Jharkhand", category: "University" },
    { name: "Sido Kanhu Murmu University", location: "Dumka, Jharkhand", category: "University" },
    { name: "Vinoba Bhave University", location: "Hazaribagh, Jharkhand", category: "University" },
    { name: "Birsa Agricultural University", location: "Ranchi, Jharkhand", category: "Agriculture" },
    { name: "Central University of Jharkhand", location: "Ranchi, Jharkhand", category: "Central University" },
    { name: "National Institute of Foundry and Forge Technology (NIFFT)", location: "Ranchi, Jharkhand", category: "Engineering" },
    { name: "Rajendra Institute of Medical Sciences (RIMS)", location: "Ranchi, Jharkhand", category: "Medical" },
    { name: "All India Institute of Medical Sciences (AIIMS)", location: "Deoghar, Jharkhand", category: "Medical" },
    { name: "National University of Study and Research in Law (NUSRL)", location: "Ranchi, Jharkhand", category: "Law" },
    { name: "Indian Institute of Technology (IIT), Kanpur", location: "Kanpur", category: "Engineering" },
    { name: "Indian Institute of Technology (IIT), Madras", location: "Chennai", category: "Engineering" },
    { name: "Jawaharlal Nehru University (JNU)", location: "New Delhi", category: "University" },
    { name: "Banaras Hindu University (BHU)", location: "Varanasi", category: "University" }
  ].map((item, idx) => ({ id: idx + 1, ...item }));

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filtered = allInstitutes.filter(inst => 
    inst.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    inst.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section style={{ padding: '80px 0', background: '#fff' }}>
      <div className="container">
        <div className="section-header">
          <h2>Empaneled Institutions</h2>
          <p style={{ color: '#666' }}>Recognized institutions where students can avail the GSCC Scheme</p>
          <div className="title-underline"></div>
        </div>

        <div style={{ background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
          <div style={{ marginBottom: '25px', position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} size={20} />
            <input 
              type="text" 
              placeholder="Search by institution name or location..." 
              style={{ width: '100%', padding: '15px 15px 15px 50px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Sr. No.</th>
                <th>Institution Name</th>
                <th>Location</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((inst, i) => (
                <tr key={inst.id}>
                  <td>{indexOfFirstItem + i + 1}</td>
                  <td style={{ fontWeight: '600', color: 'var(--secondary-blue)' }}>{inst.name}</td>
                  <td>{inst.location}</td>
                  <td><span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', background: '#e8f5e9', color: '#2e7d32' }}>{inst.category}</span></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#888' }}>No institutions found matching your search.</td>
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

export default Institutions;
