import React, { useState, useEffect } from 'react';
import './ApplicationManager.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { Application } from './Apply';
import { Course } from './SystemAdminHome';

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

  useEffect(() => {
    const selectedApplication = applicationsData[rowNumberVal];
    if (!selectedApplication) {
      alert('Application data is not available.');
    } else {
      setCurrentApplication(selectedApplication);
    }
  }, [applicationsData, rowNumberVal]);

  const handleBack = () => {
    navigate('/application-manager');
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
      alert('There are no more applications!');
      return;
    }
    const newIndex = rowNumberVal + 1;
    localStorage.setItem("currentRow", newIndex.toString());
    setCurrentApplication(applicationsData[newIndex]);
  };

  const handleConfirm = () => {
    if (!statusOption && currentApplication?.status === "Pending Review") {
      alert('Please select a status.');
      return;
    }
  
    // Update the status of the current application
    const updatedApplicationsData = [...applicationsData];
    if (statusOption === 'Denied') {
      updatedApplicationsData[rowNumberVal].status = 'Denied';
      updatedApplicationsData[rowNumberVal].assignment = 'Denied';
    } else {
      updatedApplicationsData[rowNumberVal].status = 'Approved';
      updatedApplicationsData[rowNumberVal].assignment = statusOption;
    }
  
    // Update applications data in state and localStorage
    setApplicationsData(updatedApplicationsData);
    localStorage.setItem('applicationsData', JSON.stringify(updatedApplicationsData));
    alert(`${currentApplication?.name}'s assignment updated to ` + statusOption);
  
    // Load courses from local memory
    const storedCourses = localStorage.getItem('courses');
    const courses: Course[] = storedCourses ? JSON.parse(storedCourses) : []; // Define the type here
  
    // Find the course matching the statusOption
    const courseIndex = courses.findIndex((course: Course) => course.title === statusOption); // Define type for course
    if (courseIndex !== -1 && currentApplication) { // Check that currentApplication is not null
      // Add the currentApplication's name to the tas_assigned list
      const currentTAName = currentApplication.name; // Assuming currentApplication has a name property
      const course = courses[courseIndex];
  
      // Check if the name is already in the tas_assigned list to avoid duplicates
      if (!course.tas_assigned.includes(currentTAName)) {
        course.tas_assigned = [...course.tas_assigned, currentTAName];
      }
  
      // Update the courses array with the modified course
      courses[courseIndex] = course;
  
      // Save updated courses back to localStorage
      localStorage.setItem('courses', JSON.stringify(courses));
    } else if (!currentApplication) {
      alert("Current application is null. Please check the application data.");
    } else {
      alert(`Course with title "${statusOption}" not found.`);
    }
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
          <h2>Student Application</h2>
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

        <h2>Professor Preferences</h2>
          <table>
            <thead>
              <tr>
                <th>Professor's Name</th>
                <th>Course Prefix</th>
                <th>Course Name</th>
                <th>Preference</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td>Alexandre Gomes de Siqueira</td>
                <td>COP4600</td>
                <td>Operating Systems</td>
                <td>High</td>
              </tr>
              <tr>
                <td>Lisha Zhou</td>
                <td>COP3502C</td>
                <td>Programming Fundamentals 1</td>
                <td>Low</td>
              </tr>
              <tr>
                <td>Cheryl Resch</td>
                <td>CDA3101</td>
                <td>Computer Organization</td>
                <td>Medium</td>
              </tr>
            </tbody>
          </table>

          <hr className="separator-line" />
          <div className="form-group-sys-add">
            <div className="form-group-wrapper">
              <label>Assign to</label>
              <select className='assignment-selection' value={statusOption} onChange={(e) => setStatusOption(e.target.value)}>
                <option value="">{currentApplication?.assignment}</option>
                {assignmentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="nav-button-group">
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
