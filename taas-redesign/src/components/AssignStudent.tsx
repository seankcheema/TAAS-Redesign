import React, { useState } from 'react';
import './AssignStudent.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';




const AssignStudent: React.FC = () =>{
  const navigate = useNavigate();
  const [course_option, setCourse] = useState<string>('');

  const handleBack = () => {
    navigate('/system-admin-home');    
  }

  const course_options = [
    "COP3502C - Programming Fundamentals 1", 
    "COP4600 - Operating Systems",
    "CDA3101 - Computer Organization",
  ];

  return (
    <div className="ta-assignment-container">
      <Header />
      <img src="/assets/Arrow left.svg" alt="back-arrow" className='back-arrow' onClick={handleBack}/>
      <div className="content">
        <div className='prev-application-container'>
        <h1>Student Application (1/3)</h1>
        <h2 className="indented-title"><u>Application Summary</u></h2> {/* Indented copy */}
          <div className="application-info">
            <h2>Fall 2024 Application</h2>
            <p><b>Name: </b> Jim Beam</p>
            <p><b>UF Email: </b> jimbeam@ufl.edu </p>
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
              <button className="navigation-btn">Exit</button>
              <button className="navigation-btn">Previous Application</button>
              <button className="navigation-btn">Confirm</button>
              <button className="navigation-btn">Next Application</button>
            </div>
            <p>Note: Please click <b>Confirm</b> to update the assignment.</p>
        </div>
      </div>

        <Footer />

        
      
    </div>
    
  );
};

export default AssignStudent;
