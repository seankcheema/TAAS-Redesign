import React, { useState, useEffect } from 'react';
import './AssignStudent.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { Application } from './SystemAdminHome';



const AssignStudent: React.FC = () =>{
  const navigate = useNavigate();
  const [status_option, setStatusOption] = useState<string>('');

  // Load application data from localStorage on initial render
  const [application, setApplication] = useState<Application>(() => {
    const storedApplication = localStorage.getItem('applicationData');
    return storedApplication ? JSON.parse(storedApplication) : null;
  });

  const [currentApplication, setCurrentApplication] = useState<Application>(() => {
    const storedApplication = localStorage.getItem('currentApp');
    return storedApplication ? JSON.parse(storedApplication) : null;
  });

  const tableEntryCount = localStorage.getItem('currentTableEntryCount');
  const rowNumber = localStorage.getItem('currentRow');
  const rowNumberVal = Number(rowNumber);
  const previousPage = localStorage.getItem('previousPage');
  const course_options = [
    "COP3502C - Programming Fundamentals 1", 
    "COP4600 - Operating Systems",
    "CDA3101 - Computer Organization",
  ];
  const [course_option, setCourse] = useState<string>('');


  // Load application data from localStorage on initial render
  const [urgentApplications, setUrgentApplications] = useState<Application[]>(() => {
    const storedUrgentApplications = localStorage.getItem('urgentapplications');
    if (storedUrgentApplications) {
      const parsedApplications = JSON.parse(storedUrgentApplications);
      return parsedApplications;
    }
    return null; // Return null if no applications found
  });

  // Load application data from localStorage on initial render
  const [filteredApplications, setFilteredApplications] = useState<Application[]>(() => {
    const storedFilteredApplications = localStorage.getItem('filteredApps');
    if (storedFilteredApplications) {
      const parsedApplications = JSON.parse(storedFilteredApplications);
      return parsedApplications;
    }
    return null; // Return null if no applications found
  });


  useEffect(() => {
    if(previousPage === "System-Admin-Home"){
      setCurrentApplication(filteredApplications[rowNumberVal]);
    }
    else{
      setCurrentApplication(urgentApplications[rowNumberVal]);
    }
  }, [currentApplication]);

  const handleBack = () => {
    navigate('/system-admin-home');
  };

  const handlePrevious = () => {
    if (rowNumber === '0') {
      alert('There are no prior applications!'); // Notify user
    }
    else{
      const newIndex = rowNumberVal - 1;
      localStorage.setItem("currentRow", newIndex.toString()); // Store the count in localStorage
      if(previousPage === "System-Admin-Home"){
        setCurrentApplication(filteredApplications[newIndex]);
        if(filteredApplications[newIndex].status === "Pending Review"){
          window.scrollTo(0,0);
          navigate(`/approve-application`); // Use index + 1 for the route
        }
        else{
          navigate(`/assign-student`);
        }
      }
      else{
        setCurrentApplication(urgentApplications[newIndex]);
        if(urgentApplications[newIndex].status === "Pending Review"){
          navigate(`/approve-application`); // Use index + 1 for the route
        }
        else{
          window.scrollTo(0,0);
          navigate(`/assign-student`);
        }
      }
      
    }
    
  };

  const handleNext = () => {
    if (Number(tableEntryCount) === (rowNumberVal + 1)) {
      alert('There are no next applications!'); // Notify user
    }
    else{
      const newIndex = rowNumberVal + 1;
      localStorage.setItem("currentRow", newIndex.toString()); // Store the count in localStorage
      if(previousPage === "System-Admin-Home"){
        setCurrentApplication(filteredApplications[newIndex]);
        if(filteredApplications[newIndex].status === "Pending Review"){
          window.scrollTo(0,0);
          navigate(`/approve-application`); // Use index + 1 for the route
        }
        else{
          navigate(`/assign-student`);
        }
      }
      else{
        setCurrentApplication(urgentApplications[newIndex]);
        if(urgentApplications[newIndex].status === "Pending Review"){
          navigate(`/approve-application`); // Use index + 1 for the route
        }
        else{
          window.scrollTo(0,0);
          navigate(`/assign-student`);
        }
      }
    }
    
  };

  const handleConfirm = () => {
    if (status_option) {
      if(previousPage === "System-Admin-Home"){
        // Create a new array with the updated status for the first application
        const updatedApplications = urgentApplications.map((application, index) => {
          if (filteredApplications[rowNumberVal].email === application.email) { // Update the first application (index 0)
            return { ...application, student_status: status_option }; // Update status
          }
          return application; // Return unchanged application for other indices
        });

        setFilteredApplications(updatedApplications.filter(app => app.status !== "Approved" && app.status !== "Rejected") || null);
        localStorage.setItem('filteredApps', JSON.stringify(filteredApplications));
        localStorage.setItem('urgentapplications', JSON.stringify(updatedApplications)); 
      

        // Update the state with the new applications array
        setUrgentApplications(updatedApplications);
        // Update localStorage with the new applications array
        localStorage.setItem('urgentapplications', JSON.stringify(updatedApplications));
        const newCount = (Number(tableEntryCount) - 1);

        if(rowNumberVal >= newCount){
          localStorage.setItem('currentRow', (Number(tableEntryCount) - 2).toString());
        }
        localStorage.setItem('currentTableEntryCount', newCount.toString());
      
        // Provide feedback based on the selected status
        if (status_option === 'Approved') {
          alert(`Status updated to: Approved`);
          // Optionally redirect or provide further instructions
        } else {
          alert(`Status updated to: ${status_option}`);
        }

        if(newCount === 0){
          navigate(`/system-admin-home`); // Use index + 1 for the route
        }
        else{
          navigate(`/approve-application`); // Use index + 1 for the route
          window.scrollTo(0,0);
        }
      } else {
        alert('Please select a status.');
      }
    }
    else{
      // Create a new array with the updated status for the first application
      const updatedApplications = urgentApplications.map((application, index) => {
        if (urgentApplications[rowNumberVal].email === application.email) { // Update the first application (index 0)
          return { ...application, student_status: status_option }; // Update status
        }
        return application; // Return unchanged application for other indices
      });

      localStorage.setItem('urgentapplications', JSON.stringify(updatedApplications)); 

      // Update the state with the new applications array
      setUrgentApplications(updatedApplications);
    
      // Provide feedback based on the selected status
      if (status_option === 'Approved') {
        alert(`Status updated to: Approved`);
        // Optionally redirect or provide further instructions
      } else {
        alert(`Status updated to: ${status_option}`);
      }

    }
    
  };
  

  const status_options = [
    'Approved',
    'Denied',
  ];

  return (
    <div className="ta-assignment-container">
      <Header />
      <img src="/assets/Arrow left.svg" alt="back-arrow" className='back-arrow' onClick={handleBack}/>
      <div className="content">
        <div className='prev-application-container'>
        <h1>Student Application ({rowNumberVal+1}/{tableEntryCount})</h1>
        <h2 className="indented-title"><u>Application Summary</u></h2> {/* Indented copy */}
          <div className="application-info">
            <h2>Fall 2024 Application</h2>
            <p><b>Name: </b> {currentApplication.name} </p>
            <p><b>UF Email: </b> {currentApplication.email} </p>
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
          <h2><u>Teacher Preferences</u></h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Professor's Name</th>
                <th>Course Prefix</th>
                <th>Course Name</th>
                <th>Preference</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Lizzo Zhang</td>
                <td>COP3502C</td>
                <td>Programming Fundamentals 1</td>
                <td>Not interested</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Alex Seguro</td>
                <td>COP4600</td>
                <td>Operating Systems</td>
                <td>Very interested</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Charlize Rossman</td>
                <td>CDA3101</td>
                <td>Computer Organization</td>
                <td>Interested</td>
              </tr>
            </tbody>
          </table>
            <hr className="separator-line" />
            <h2 className="indented-title"><u>Action Required</u></h2> {/* Indented copy */}
            <div className="form-group-sys-add">
              <div className="form-group-wrapper">
                <label>Course Assignment:</label>
                <select value={course_option} onChange={(e) => setCourse(e.target.value)}>
                  <option value=""></option>
                  {course_options.map((course) => (
                    <option key={course} value={course}>
                      {course}
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
            <p>Note: Please click <b>Confirm</b> to update the assignment.</p>
        </div>
      </div>

        <Footer />

        
      
    </div>
    
  );
};

export default AssignStudent;
