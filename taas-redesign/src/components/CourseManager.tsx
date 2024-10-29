import React, { useState } from 'react';
import './CourseManager.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';




const CourseManager: React.FC = () =>{
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/system-admin-home');    
  }

  return (
    <div className="ta-assignment-container">
      <Header />
      <img src="/assets/Arrow left.svg" alt="back-arrow" className='back-arrow' onClick={handleBack}/>
      <div className="content">
        <div className='prev-application-container'>
        <h1>Professor Assignment Manager</h1>
        <div className='header-container'>
          <h2 className="indented-title"><u>Courses</u></h2>
          <button className="filter-btn">Filter</button>
        </div>
        <p>Click on course entries to assign a professor to them.</p>
        <table>
            <thead>
              <tr>
                <th>Prefix</th>
                <th>Title</th>
                <th>Professor(s) Assigned</th>
                <th>Enrollment</th>
                <th>Date Added</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CIS4301</td>
                <td>Databases</td>
                <td></td>
                <td>100</td>
                <td>2:10PM, October 28, 2024</td>
              </tr>
              <tr>
                <td>COP4600</td>
                <td>Operating Systems</td>
                <td>Alex Seguro</td>
                <td>103</td>
                <td>2:10PM, October 28, 2024</td>
              </tr>
              <tr>
                <td>COP4533</td>
                <td>Algorithm Abstraction and Design</td>
                <td>Alpheren Sengun, William Simmons</td>
                <td>270</td>
                <td>2:10PM, October 28, 2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

        <Footer />

        
      
    </div>
    
  );
};

export default CourseManager;
