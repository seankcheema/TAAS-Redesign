import React, { useState, useEffect } from 'react';
import './StudentManager.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { UrgentApplication } from './SystemAdminHome';
import { Application } from './Apply';

const StudentManager: React.FC = () => {
  const navigate = useNavigate();
  const [filterPending, setFilterPending] = useState(false);

  const [urgentApplications] = useState<UrgentApplication[]>(() => {
    const storedApplications = localStorage.getItem('urgentapplications');
    return storedApplications ? JSON.parse(storedApplications) : null;
  });

  const [Applications] = useState<Application[]>(() => {
    const storedApplications = localStorage.getItem('applicationsData');
    return storedApplications ? JSON.parse(storedApplications) : null;
  });

  const handleBack = () => {
    navigate('/system-admin-home');
  };

  const handleFilterToggle = () => {
    setFilterPending(!filterPending);
  };

  const handleReview = () => {
    navigate('/review-applications');
  };

  const displayedApplications = filterPending
    ? urgentApplications.filter((app) => app.student_status === 'Pending Review')
    : urgentApplications;

  useEffect(() => {
    localStorage.setItem('urgentapplications', JSON.stringify(urgentApplications));
  }, [urgentApplications]);

  return (
    <div className="ta-assignment-container">
      <Header />
      <img src="/assets/Arrow left.svg" alt="back-arrow" className="back-arrow" onClick={handleBack} />
      <div className="content">
        <div className="manage-section">
          <h2>TA Application Manager</h2>
          <div className="filter-btn-container">
            <button className="filter-btn" onClick={handleFilterToggle}>
              {filterPending ? 'Show All' : 'Filter Pending'}
            </button>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Date Submitted</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedApplications.map((application, index) => (
                <tr key={index}>
                  <td>{application.student_name}</td>
                  <td>{application.student_status}</td>
                  <td>{application.date_added}</td>
                  <td>
                    <button className="review-btn" onClick={handleReview}>Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentManager;
