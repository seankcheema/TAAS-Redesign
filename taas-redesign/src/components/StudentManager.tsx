import React, { useState, useEffect } from 'react';
import './StudentManager.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';




const StudentManager: React.FC = () =>{
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any[]>([]); // Adjust type as necessary

  useEffect(() => {
    // Load application data from localStorage on initial render
    const storedApplications = localStorage.getItem('urgentapplications');
    if (storedApplications) {
      const parsedApplications = JSON.parse(storedApplications);
      setApplications(parsedApplications); // Update state with the loaded applications
    }
  }, []);

  const handleBack = () => {
    navigate('/system-admin-home');    
  }
  const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
    const table = event.currentTarget.closest('table'); 
    const rowCount = (Number(table?.querySelectorAll('tbody tr').length)) || 0; // Count rows in <tbody> only to exclude header
    localStorage.setItem("currentTableEntryCount", rowCount.toString()); // Store the count in localStorage

    const firstCellContent = event.currentTarget.querySelector('td')?.textContent;
    
    if (firstCellContent) {
      navigate(`/assign-student/${firstCellContent}`);
    }
  }

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
                <th>#</th>
                <th>Name</th>
                <th>Student Status</th>
                <th>Application Status</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
            {applications.map((application, index) => (
            <tr onClick = {handleRowClick} key={index}>
              <td>{index + 1}</td> {/* Display index starting from 1 */}
              <td>{application.student_name}</td>
              <td>Undergraduate</td>
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
