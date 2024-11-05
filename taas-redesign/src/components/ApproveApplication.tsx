import React, { useState, useEffect } from 'react';
import './ApproveApplication.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { Application } from './Apply';

const ApproveApplication: React.FC = () => {
  const navigate = useNavigate();
  const [statusOption, setStatusOption] = useState<string>('');
  const [applicationsData, setApplicationsData] = useState<Application[]>(() => {
    const storedApplications = localStorage.getItem('applicationsData');
    return storedApplications ? JSON.parse(storedApplications) : [];
  });
  const [currentApplication, setCurrentApplication] = useState<Application | null>(null);
  const tableEntryCount = applicationsData.length;
  const rowNumber = localStorage.getItem('currentRow');
  const rowNumberVal = rowNumber ? Number(rowNumber) : 0;
  const previousPage = localStorage.getItem('previousPage');

  useEffect(() => {
    const selectedApplication = applicationsData[rowNumberVal];
    if (!selectedApplication) {
      alert('Application data is not available.');
    } else {
      setCurrentApplication(selectedApplication);
    }
  }, [applicationsData, rowNumberVal]);

  const handleBack = () => {
    navigate('/system-admin-home');
  };

  const handlePrevious = () => {
    if (rowNumberVal <= 0) {
      alert('There are no prior applications!');
      return;
    }
    const newIndex = rowNumberVal - 1;
    localStorage.setItem("currentRow", newIndex.toString());
    setCurrentApplication(applicationsData[newIndex]);
  };

  const handleNext = () => {
    if (rowNumberVal >= tableEntryCount - 1) {
      alert('There are no next applications!');
      return;
    }
    const newIndex = rowNumberVal + 1;
    localStorage.setItem("currentRow", newIndex.toString());
    setCurrentApplication(applicationsData[newIndex]);
  };

  const handleConfirm = () => {
    if (!statusOption) {
      alert('Please select a status.');
      return;
    }

  //   // Create a new array with the updated status
  //   const updatedApplications = applicationsData.map(application => {
  //     // Assuming student_ufl_email is the unique identifier
  //     if (currentApplication && application.email === currentApplication.email) {
  //         return { ...application, student_status: statusOption }; // Update the status
  //     }
  //     return application; // Return unchanged application for others
  // });

  // // Save the updated applications array to local storage
  // localStorage.setItem('applicationsData', JSON.stringify(updatedApplications));

  // // Update the local state (optional)
  // setApplicationsData(updatedApplications);

  };

  const assignmentOptions = [
    ...(currentApplication?.coursePreferences
      ? Array.isArray(currentApplication.coursePreferences)
        ? currentApplication.coursePreferences
        : [currentApplication.coursePreferences]
      : []),
    'Denied',
  ].filter(option => option.trim() !== ''); // Remove any blank entries  

  return (
    <div className="ta-assignment-container">
      <Header />
      <img src="/assets/Arrow left.svg" alt="back-arrow" className="back-arrow" onClick={handleBack} />
      <div className="content">
        <div className="prev-application-container">
          <h2>Student Application ({rowNumberVal + 1}/{tableEntryCount})</h2>
          {currentApplication && (
            <div className="application-info">
              <p><b>Name: </b>{currentApplication.name}</p>
              <p><b>UF Email: </b>{currentApplication.email}</p>
              <p><b>Semester admitted:</b> {currentApplication.semesterAdmitted}</p>
              <p><b>Class Standing:</b> {currentApplication.classStanding}</p>
              <p><b>Graduating Semester:</b> {currentApplication.graduatingSemester}</p>
              <p><b>UF GPA:</b> {currentApplication.ufGpa}</p>
              <p><b>UF ID:</b> {currentApplication.ufId}</p>
              <p><b>Country of Origin:</b> {currentApplication.countryOfOrigin}</p>
              <p><b>Course Preferences:</b></p>
              {currentApplication.coursePreferences?.map((course, index) => (
                <p key={index}><b>{index + 1})</b> {course}</p>
              ))}
              <p><b>Research area/teaching interests:</b></p>
              <p>{currentApplication.researchInterests}</p>
              <p><b>Travel plans:</b></p>
              <p>{currentApplication.travelPlans}</p>
            </div>
          )}

          <hr className="separator-line" />
          <div className="form-group-sys-add">
            <div className="form-group-wrapper">
              <label>Assign to</label>
              <select className='assignment-selection' value={statusOption} onChange={(e) => setStatusOption(e.target.value)}>
                <option value="">--Select--</option>
                {assignmentOptions.map((option) => (
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
            <button className="navigation-btn" onClick={handleNext}>Next Application</button>
          </div>
          <p>Note: Please click <b>Confirm</b> after changing the status to make updates.</p>

          <div className="sidebar">
          <h2>Applications List</h2>
          <ul>
            {applicationsData.map((application, index) => (
              <li key={index} className="application-item">
                <span className={`status-indicator ${application.status === 'Pending Review' ? 'orange-dot' : 'green-check'}`}></span>
                {application.name}
              </li>
            ))}
          </ul>
        </div>
        </div>
        
      </div>
      <Footer />
    </div>
  );
};

export default ApproveApplication;
