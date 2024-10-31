import React, { useState, useEffect } from 'react';
import './ApproveApplication.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Application } from './Apply'; // Import the Application interface
import { UrgentApplication } from './SystemAdminHome'; // Import the Application interface

const ApproveApplication: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status_option, setStatusOption] = useState<string>('');
  const currentPath = location.pathname;
  const typePath = '/approve-applications/';
  const locationValue = currentPath.substring(typePath.length);

  // Load application data from localStorage on initial render
  const [application, setApplication] = useState<Application>(() => {
    const storedApplication = localStorage.getItem('applicationData');
    return storedApplication ? JSON.parse(storedApplication) : null;
  });

  // Load application data from localStorage on initial render
  const [urgentApplications, setUrgentApplications] = useState<UrgentApplication[]>(() => {
    const storedUrgentApplications = localStorage.getItem('urgentapplications');
    if (storedUrgentApplications) {
      const parsedApplications = JSON.parse(storedUrgentApplications);
      return parsedApplications;
    }
    return null; // Return null if no applications found
  });


  useEffect(() => {
    if (!application) {
      alert('Application data is not available.');
    }
  }, [application]);

  const handleBack = () => {
    navigate('/system-admin-home');
  };

  const handlePrevious = () => {
    if (locationValue === '1') {
      alert('There are no prior applications!'); // Notify user
    }
    navigate(`/assign-student/${locationValue}`);
  };

  const tableEntryCount = localStorage.getItem('currentTableEntryCount');

  const handleConfirm = () => {
    if (status_option) {
      // Create a new array with the updated status for the first application
      const updatedApplications = urgentApplications.map((application, index) => {
        if (index === 0) { // Update the first application (index 0)
          return { ...application, student_status: status_option }; // Update status
        }
        return application; // Return unchanged application for other indices
      });
  
      // Update the state with the new applications array
      setUrgentApplications(updatedApplications);
      // Update localStorage with the new applications array
      localStorage.setItem('urgentapplications', JSON.stringify(updatedApplications)); 
  
      // Provide feedback based on the selected status
      if (status_option === 'Approved') {
        alert(`Status updated to: Approved`);
        // Optionally redirect or provide further instructions
      } else {
        alert(`Status updated to: ${status_option}`);
      }
    } else {
      alert('Please select a status.');
    }
  };
  

  const status_options = [
    'Approved',
    'Denied',
  ];

  return (
    <div className="ta-assignment-container">
      <Header />
      <img src="/assets/Arrow left.svg" alt="back-arrow" className="back-arrow" onClick={handleBack} />
      <div className="content">
        <div className="prev-application-container">
          <h1>Student Application (1/{tableEntryCount})</h1>
          <h2 className="indented-title"><u>Application Summary</u></h2> {/* Indented copy */}
          <div className="application-info">
            <h2>Fall 2024 Application</h2>
            <p><b>Name: </b> Jim Beam</p>
            <p><b>UF Email: </b> jimbeam@ufl.edu </p>
            <p><b>Semester admitted:</b> Summer 2021</p>
            <p><b>Graduating Semester:</b> Spring 2025</p>
            <p><b>UF GPA:</b> 3.85</p>
            <p><b>UF ID:</b> 1234-5678</p>
            <p><b>Country of Origin:</b> United States of America</p>
            <p><b>Course Preferences:</b></p>
            <p><b>1)</b> COP4600 - Operating Systems</p>
            <p><b>2)</b> COP3502C - Programming Fundamentals 1</p>
            <p><b>3)</b> CDA3101 - Introduction to Computer Organization</p>
            <p><b>4)</b></p>
            <p><b>5)</b></p>
            <p><b>Research area/teaching interests:</b></p>
            <p>I am extremely interested in Linux Kernel development and Operating Systems.</p>
            <p><b>Travel plans:</b></p>
            <p>N/A</p>
          </div>
          <hr className="separator-line" />
          <h2 className="indented-title"><u>Action Required</u></h2> {/* Indented copy */}
          <div className="form-group-sys-add">
            <div className="form-group-wrapper">
              <label>New Status:</label>
              <select value={status_option} onChange={(e) => setStatusOption(e.target.value)}>
                <option value="">Pending</option>
                {status_options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="nav-button-group">
            <button className="navigation-btn" onClick={handleBack}>Exit</button>
            <button className="navigation-btn" onClick={handlePrevious}>Previous Application</button>
            <button className="navigation-btn" onClick={handleConfirm}>Confirm</button>
            <button className="navigation-btn">Next Application</button>
          </div>
          <p>Note: Please click <b>Confirm</b> after changing the status to make updates.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ApproveApplication;
