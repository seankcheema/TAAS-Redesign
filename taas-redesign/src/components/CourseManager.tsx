import React, { useState, useEffect } from 'react';
import './CourseManager.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const CourseManager: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]); // Adjust type as necessary
  const [showUnassignedOnly, setShowUnassignedOnly] = useState(false);

  const handleBack = () => {
    navigate('/system-admin-home');    
  };

  useEffect(() => {
    // Load application data from localStorage on initial render
    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
      const parsedCourses = JSON.parse(storedCourses);
      setCourses(parsedCourses); // Update state with the loaded courses
    }
  }, []);

  const handleCourseReview = (index: number, value: string) => {
    const selectedCourses = courses.filter(course => course.title === value);
    localStorage.setItem("currentCourse", JSON.stringify(selectedCourses[0]));

    localStorage.setItem("courses", JSON.stringify(courses));
    localStorage.setItem("currentRow", index.toString()); // Store the count in localStorage
    localStorage.setItem("previousPage", "course-manager");
    navigate(`/course-editor/`); // Use index + 1 for the route 
  };

  const handleFilterUnassigned = () => {
    setShowUnassignedOnly(prev => !prev);
  };

  const displayedCourses = showUnassignedOnly 
    ? courses.filter(course => course.professors_assigned.length === 0)
    : courses;

  return (
    <div className="ta-assignment-container">
      <Header />
      <img src="/assets/Arrow left.svg" alt="back-arrow" className='back-arrow' onClick={handleBack}/>
      <div className="content">
        <div className='prev-application-container'>
          <h2>Professor Assignment Manager</h2>
          <div className='filter-btn-container'>
            <button className="filter-btn" onClick={handleFilterUnassigned}>
              {showUnassignedOnly ? "Show All" : "Filter Unassigned"}
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Professors Assigned</th>
                <th>Capacity</th>
                <th>Date Added</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedCourses.map((course, index) => (
                <tr key={index}>
                  <td>{course.title}</td>
                  <td>{course.professors_assigned.join(', ')}</td>
                  <td>{course.capacity}</td>
                  <td>{course.date_added}</td>
                  <td>
                    <button className="review-btn" onClick={() => handleCourseReview(index, course.title)}>Review</button>
                  </td>
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

export default CourseManager;
