import React from 'react';
import './SystemAdminHome.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const SystemAdminHome: React.FC = () =>{
  const navigate = useNavigate();

  const handleAllTAs = () => {
    navigate('/student-manager');    
  }
  const handleAllCourses = () => {
    navigate('/course-manager');    
  }
  const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
    const firstCellContent = event.currentTarget.querySelector('td')?.textContent;
    
    if (firstCellContent) {
      navigate(`/assign-student/${firstCellContent}`);
    }
  };

  return (
    <div className="ta-assignment-container">
      <Header />

      <div className="content">
        {/* Apply Now Section */}
        <div className="update-system-section">
          <h2>Update System</h2>
          <p>
            Make changes to the system, including
            adding new professors, updating course information, 
            setting deadline for applications, sending 
            notifications, and exporting data.
          </p>
          <div className="button-container">
                <button className="square-btn">Modify System</button>
              <button className="square-btn">Add New Professors</button>
              <button className="square-btn">Update Course Information</button>
              <button className="square-btn">Sent Notifications</button>
          </div>
        </div>

        {/*Manager:
-course management (assigning profs to courses)
-assign students to courses
-Open application window (set deadline for app, etc.) */}

        {/* Manage TA Applications Section */}
        <div className="manage-section">
          <h2>Manage TA Applications</h2>
          <p>
            Update the status of applying students who need action.
          </p>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Status</th>
                <th>Date Added</th>
              </tr>
            </thead>
            <tbody>
              <tr onClick={handleRowClick}> 
                <td>1</td>
                <td>Jim Beam</td>
                <td>Application Approval Needed</td>
                <td>2:20PM, October 28, 2024</td>
              </tr>
              <tr>
                <td>2</td>
                <td>John Deer</td>
                <td>Application Approval Needed</td>
                <td>2:10PM, October 28, 2024</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Jack Daniels</td>
                <td>Application Approval Needed</td>
                <td>1:10PM, October 28, 2024</td>
              </tr>
            </tbody>
          </table>
          <button className="wider-btn" onClick={handleAllTAs}>All TA Applications</button>
        </div>

        {/* My Applications Section */}
        <div className="manage-section">
          <h2>Professor-Course Assignment</h2>
          <p>
          Assign professors to courses that require assignment.
          </p>
          <table>
            <thead>
              <tr>
                <th>Prefix</th>
                <th>Title</th>
                <th>Enrollment</th>
                <th>Date Added</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CIS4301</td>
                <td>Databases</td>
                <td>100</td>
                <td>2:10PM, October 28, 2024</td>
              </tr>
              <tr>
                <td>COP4600</td>
                <td>Operating Systems</td>
                <td>103</td>
                <td>2:10PM, October 28, 2024</td>
              </tr>
              <tr>
                <td>COP4533</td>
                <td>Algorithm Abstraction and Design</td>
                <td>270</td>
                <td>2:10PM, October 28, 2024</td>
              </tr>
            </tbody>
          </table>
          <button className="wider-btn" onClick={handleAllCourses}>All Professor Assignments </button>
        </div>
        
      </div>

      <Footer />
    </div>
    
  );
};

export default SystemAdminHome;
