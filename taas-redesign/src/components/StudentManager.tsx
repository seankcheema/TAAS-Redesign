import React, { useState } from 'react';
import './StudentManager.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';




const StudentManager: React.FC = () =>{
  const navigate = useNavigate();
  const [course_option, setCourse] = useState<string>('');

  const handleBack = () => {
    navigate('/system-admin-home');    
  }
  const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
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
              <tr onClick={handleRowClick}>
                <td>1</td>
                <td>Jim Beam</td>
                <td>Undergraduate</td>
                <td>Application Approval Needed</td>
                <td>2:20PM, October 28, 2024</td>
              </tr>
              <tr>
                <td>2</td>
                <td>John Deer</td>
                <td>Undergraduate</td>
                <td>Application Approval Needed</td>
                <td>2:10PM, October 28, 2024</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Jack Daniels</td>
                <td>Undergraduate</td>
                <td>Application Approval Needed</td>
                <td>1:10PM, October 28, 2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

        <Footer />

        
      
    </div>
    
  );
};

export default StudentManager;
