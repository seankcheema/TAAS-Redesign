import React, { useState, useEffect } from 'react';
import './StudentManager.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { UrgentApplication } from './SystemAdminHome';
import { addListener } from 'process';




const StudentManager: React.FC = () =>{
  const navigate = useNavigate();

  useEffect(() => {
    // Load application data from localStorage on initial render
    const storedApplications = localStorage.getItem('urgentapplications');
    if (storedApplications) {
      const parsedApplications = JSON.parse(storedApplications);
      setApplications(parsedApplications); // Update state with the loaded applications
    }
  }, []);

  const [urgentapplications, setApplications] = useState<UrgentApplication[]>(() => {
    // Retrieve applications from localStorage or use default values
    const storedApplications = localStorage.getItem('urgentapplications');
    return storedApplications ? JSON.parse(storedApplications) : null;
  });

  const handleBack = () => {
    navigate('/system-admin-home');    
  }
  const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>, index: number, value: string) => {
    alert(urgentapplications.length);
    const table = event.currentTarget.closest('table'); 
    const rowCount = (Number(table?.querySelectorAll('tbody tr').length)) || 0; // Count rows in <tbody> only to exclude header
    localStorage.setItem("currentTableEntryCount", rowCount.toString()); // Store the count in localStorage
    localStorage.setItem("currentRow", index.toString());
    localStorage.setItem("previousPage", "StudentManager");
    
    const currentStudent = urgentapplications.filter(app => app.student_ufl_email === value);

    localStorage.setItem("currentApp", JSON.stringify(currentStudent[0]));

    if(currentStudent[0].student_status === "Application Approval Needed"){
      alert("Index " + index + " for student " + currentStudent[0].student_name);
      navigate(`/approve-application`); // Use index + 1 for the route
    }
    else{
      alert("Index " + index + " for student " + currentStudent[0].student_name);
      navigate(`/assign-student`);
    }
  };

  return (
    <div className="ta-assignment-container">
      <Header />
      <img src="/assets/Arrow left.svg" alt="back-arrow" className='back-arrow' onClick={handleBack}/>
      <div className="content">
        <div className='prev-application-container'>
        <h1>Student Application Manager</h1>
        <div className='header-container'>
          <h2 className="indented-title"><u>Applications</u></h2>
          <button className="filter-btn">Filter</button>
        </div>
        <p>Click on student entries to update their status.</p>
        <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Application Status</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
            {urgentapplications.map((application, index) => (
            <tr onClick={(event) =>
              handleRowClick(event, index, application.student_ufl_email)
            } key={index}>
              <td>{application.student_name}</td>
              <td>{application.student_status}</td>
              <td>{application.date_added}</td>
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
