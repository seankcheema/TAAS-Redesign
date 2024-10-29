import React from 'react';
import './Course.css';
import Header from './Header';
import Footer from './Footer';

const Course: React.FC = () => {
  return (
    <div className="ta-assignment-container">
      <Header />
      <div className="content">
        <div className="course-container">
        <h2>COP4600 - Operating Systems</h2>
            <div className="course-info">
              <p>Professor: Dr. Alexandre Gomes de Siqueira</p>
              <p>TA Capacity: 22</p>
            </div>
            <div className='ta-list'>
              <p>Current TA Assignments</p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><a href="#">Student 1</a></td>
                <td><a href="mailto:student1@ufl.edu">student1@ufl.edu</a></td>
              </tr>
              <tr>
                <td><a href="#">Student 2</a></td>
                <td><a href="mailto:student2@ufl.edu">student2@ufl.edu</a></td>
              </tr>
              <tr>
                <td><a href="#">Student 3</a></td>
                <td><a href="mailto:student3@ufl.edu">student3@ufl.edu</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </div>

      <div className="footer-container">
        <Footer />
        </div>
    </div>
    
  );
};

export default Course;
