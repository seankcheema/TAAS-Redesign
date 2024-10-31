import React, { useEffect, useState } from 'react';
import './SystemAdminHome.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

export interface UrgentApplication {
  student_name: string;
  student_ufl_email: string;
  student_status: string;
  date_added: string;
}

const SystemAdminHome: React.FC = () => {
  const [urgentapplications, setApplications] = useState<UrgentApplication[]>(() => {
    // Retrieve applications from localStorage or use default values
    const storedApplications = localStorage.getItem('urgentapplications');
    return storedApplications ? JSON.parse(storedApplications) : [
      { student_name: "Jim Beam", student_ufl_email: "jimbeam@ufl.edu", student_status: "Application Approval Needed", date_added: "2:20PM, October 28, 2024" },
      { student_name: "John Deer", student_ufl_email: "johndeer@ufl.edu", student_status: "Approved", date_added: "2:10PM, October 28, 2024" },
      { student_name: "Jack Daniels", student_ufl_email: "jackdaniels@ufl.edu", student_status: "Application Approval Needed", date_added: "1:10PM, October 28, 2024" },
      { student_name: "Jill Hill", student_ufl_email: "jillhill@ufl.edu", student_status: "Rejected", date_added: "1:10PM, October 28, 2024" },
      { student_name: "Jane Doe", student_ufl_email: "janedoe@ufl.edu", student_status: "Application Approval Needed", date_added: "12:00PM, October 28, 2024" },
    ];
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Store applications in localStorage whenever they change
    localStorage.setItem('urgentapplications', JSON.stringify(urgentapplications));
  }, [urgentapplications]);

  const handleAllTAs = () => {
    navigate('/student-manager');    
  };

  const handleAllCourses = () => {
    navigate('/course-manager');    
  };

  const handleRowClick = (index: number) => {
    const rowCount = urgentapplications.filter(app => app.student_status !== "Approved" && app.student_status !== "Rejected").length;
    localStorage.setItem("currentTableEntryCount", rowCount.toString()); // Store the count in localStorage

    navigate(`/approve-applications/${index + 1}`); // Use index + 1 for the route
  };

  // Filter applications to exclude Approved and Rejected statuses
  const filteredApplications = urgentapplications.filter(app => app.student_status !== "Approved" && app.student_status !== "Rejected");

  return (
    <div className="ta-assignment-container">
      <Header />

      <div className="content">
        {/* Apply Now Section */}
        <div className="update-system-section">
          <h2>Update System</h2>
          <p>
            Make changes to the system, including adding new professors, updating course information, 
            setting deadline for applications, sending notifications, and exporting data.
          </p>
          <div className="button-container">
            <button className="square-btn">Modify System</button>
            <button className="square-btn">Add New Professors</button>
            <button className="square-btn">Update Course Information</button>
            <button className="square-btn">Sent Notifications</button>
          </div>
        </div>

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
              {filteredApplications.map((application, index) => (
                <tr key={index} onClick={() => handleRowClick(index)}> 
                  <td>{index + 1}</td> {/* Display index starting from 1 */}
                  <td>{application.student_name}</td>
                  <td>{application.student_status}</td>
                  <td>{application.date_added}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="wider-btn" onClick={handleAllTAs}>All TA Applications</button>
        </div>

        {/* Professor-Course Assignment Section */}
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
