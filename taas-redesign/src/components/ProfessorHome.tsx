import React from 'react';
import './ProfessorHome.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';




const ProfessorHome: React.FC = () =>{
  const navigate = useNavigate();

  const handleReview = () => {
    navigate('/course/COP4600/review');
  }


  return (
    <div className="ta-assignment-container">
      <Header />

      <div className="content">
        {/* My Courses Section */}
        <div className="prof-my-courses-section">
          <h2>My Courses</h2>
          <p>You are currently assigned to <a href="course/COP4600">COP4600</a> and <a href="#">CDA3101</a>.</p>
          {/* <button className="courses-btn">Manage Courses</button> */}
        </div>

        {/* My Applications Section */}
        <div className="my-applications-section">
          <h2>Review Applications</h2>
          <table className="even-width-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Capacity</th>
                <th>Review Applications</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><a href="course/COP4600">COP4600</a></td>
                <td>22</td>
                <td><button className="review-btn" onClick={handleReview}>Review</button></td>
              </tr>
              <tr>
                <td><a href="#">CDA3101</a></td>
                <td>17</td>
                <td><button className="review-btn">Review</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        
      </div>

        <Footer />
        
      
    </div>
    
  );
};

export default ProfessorHome;
