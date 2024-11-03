import React, { useState, useEffect } from 'react';
import './CourseManager.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate, } from 'react-router-dom';




const CourseManager: React.FC = () =>{
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]); // Adjust type as necessary

  const handleBack = () => {
    navigate('/system-admin-home');    
  }

  useEffect(() => {
    // Load application data from localStorage on initial render
    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
      const parsedCourses = JSON.parse(storedCourses);
      setCourses(parsedCourses); // Update state with the loaded applications
    }
  }, []);

  const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>, index: number, value: string) => {
    const table = event.currentTarget.closest('table'); 
    const rowCount = (Number(table?.querySelectorAll('tbody tr').length)) || 0; // Count rows in <tbody> only to exclude header
    localStorage.setItem("currentTableEntryCount", rowCount.toString()); // Store the count in localStorage
    localStorage.setItem("currentRow", index.toString());

    const selectedCourses = courses.filter(course => course.prefix === value);
    localStorage.setItem("currentCourse", JSON.stringify(selectedCourses[0]));
    localStorage.setItem("previousPage", "Course-Manager");
    localStorage.setItem('courses', JSON.stringify(courses));
    
    navigate(`/course-editor`);
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
                <th>Index</th>
                <th>Prefix</th>
                <th>Title</th>
                <th>Professor(s) Assigned</th>
                <th>Enrollment</th>
                <th>Date Added</th>
              </tr>
            </thead>
            <tbody>
            {courses.map((course, index) => (
            <tr key={index}
            onClick={(event) =>
              handleRowClick(event, index, course.prefix)
            }>
              <td>{index + 1}</td> {/* Display index starting from 1 */}
              <td>{course.prefix}</td>
              <td>{course.title}</td>
              <td>{course.professors_assigned}</td>
              <td>{course.enrollment}</td>
              <td>{course.date_added}</td>
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
