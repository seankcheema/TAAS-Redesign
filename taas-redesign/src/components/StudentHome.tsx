import React from 'react';
import './StudentHome.css';
import Header from './Header';
import Footer from './Footer';

const StudentHome = () => {
  return (
    <div className="ta-assignment-container">
      <Header />

      <div className="content">
        {/* Apply Now Section */}
        <div className="apply-section">
          <h2>Apply Now</h2>
          <p>
            Spring 2025 applications are open now! <a>Due 12/13/2024</a>.
          </p>
          <button className="apply-btn">Apply</button>
        </div>

        {/* My Courses Section */}
        <div className="my-courses-section">
          <h2>My Courses</h2>
          <p>You are currently assigned to <a>COP4600</a>.</p>
        </div>

        {/* My Applications Section */}
        <div className="my-applications-section">
          <h2>My Applications</h2>
          <table>
            <thead>
              <tr>
                <th>Semester</th>
                <th>Application Status</th>
                <th>Date Submitted</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><a href="#">Fall 2024</a></td>
                <td>Accepted</td>
                <td>June 21, 2024</td>
              </tr>
              <tr>
                <td><a href="#">Spring 2024</a></td>
                <td>Accepted</td>
                <td>November 30, 2023</td>
              </tr>
              <tr>
                <td><a href="#">Fall 2023</a></td>
                <td>Rejected</td>
                <td>June 10, 2023</td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>

      <Footer />
    </div>
    
  );
};

export default StudentHome;
