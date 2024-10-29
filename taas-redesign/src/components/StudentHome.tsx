import React, { useState, useEffect } from 'react';
import './StudentHome.css';
import Header from './Header';
import Footer from './Footer';

const StudentHome: React.FC = () => {
  const [applicationSubmitted, setApplicationSubmitted] = useState<boolean>(false);
  const [submittedApplication, setSubmittedApplication] = useState<any>(null); // Store submitted application details

  useEffect(() => {
    // Check local storage for submitted application status
    const applicationData = localStorage.getItem('applicationData');
    if (applicationData) {
      const application = JSON.parse(applicationData);
      if (application.submitted) {
        setApplicationSubmitted(true);
        setSubmittedApplication(application); // Save the application details
      }
    }
  }, []);

  const handleApply = () => {
    window.location.href = '/apply';
  };

  return (
    <div className="ta-assignment-container">
      <Header />

      <div className="content">
        {/* Apply Now Section */}
        <div className="apply-section">
          <h2>Apply Now</h2>
          <p>
            {applicationSubmitted
              ? "Your application has been submitted! You can review or edit it until the due date (12/13/2024)."
              : "Spring 2025 applications are open now! Due 12/13/2024."}
          </p>
          <button className="apply-btn" onClick={handleApply}>
            {applicationSubmitted ? "Review/Edit Application" : "Apply"}
          </button>
        </div>

        {/* My Courses Section */}
        <div className="my-courses-section">
          <h2>My Courses</h2>
          <p>You are currently assigned to <a>COP4600</a>.</p>
        </div>

        {/* My Applications Section */}
        <div className="my-applications-section">
          <h2>My Applications</h2>
          <table className="even-width-table">
            <thead>
              <tr>
                <th>Semester</th>
                <th>Application Status</th>
                <th>Date Submitted</th>
              </tr>
            </thead>
            <tbody>
              {submittedApplication && (
                <tr>
                  <td><a href={`/apply`}>{submittedApplication.semester}</a></td>
                  <td>{submittedApplication.status}</td>
                  <td>{submittedApplication.dateSubmitted}</td>
                </tr>
              )}
              <tr>
                <td><a href="/applications/fall-2024">Fall 2024</a></td>
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
