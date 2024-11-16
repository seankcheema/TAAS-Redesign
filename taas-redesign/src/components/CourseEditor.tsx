import React, { useEffect, useState } from 'react';
import './Apply.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import {Course} from './SystemAdminHome';
import {Application} from './Apply';

const CourseEditor: React.FC = () => {
  // Example list of professors for the dropdown
  const professorOptions = [
    "Alper Yilmaz",
    "Anil K. Jain",
    "Dapeng Oliver Wu",
    "Daisy Zhe Wang",
    "Jose Fortes",
    "Juan E. Gilbert",
    "Lisa Anthony",
    "Muhammad Al Saad",
    "Panos Ipeirotis",
    "Peter Dobbins",
    "Prabhat Mishra",
    "Sanjay Ranka",
    "Shahin Kamali",
    "Sumi Helal",
    "Yuguang Fang",
    "Zhe He",
    "Alexandre Gomes Siqueira"
  ];
  const rowNumber = localStorage.getItem('currentRow');
  const rowNumberVal = Number(rowNumber);
  const previousPage = localStorage.getItem('previousPage');

// Load application data from localStorage on initial render
const [courses, setCourses] = useState<Course[]>(() => {
  const storedCourses = localStorage.getItem('courses');
  if (storedCourses) {
    const parsedCourses = JSON.parse(storedCourses);
    return parsedCourses;
  }
  return null; // Return null if no applications found
});

  const navigate = useNavigate();

  const [course, setCourse] = useState<Course>(() => {
    const savedCourse = localStorage.getItem('currentCourse');
    return savedCourse ? JSON.parse(savedCourse) : null;
  });

  const [taList, setTAList] = useState<string[]>(() => {
    // Retrieve tas_assigned from current course
    return course.tas_assigned || [];
  });
  

  const [taEmails, setTAEmails] = useState<string[]>(() => {
    // Retrieve applicationsData from localStorage
      const applications = localStorage.getItem('applicationsData');
      if (applications) {
        const applicationsData = JSON.parse(applications);

        // Filter and map assignments based on matching course.title
        interface ApplicationData {
          assignment: string;
          email: string;
        }

        const matchingAssignments: string[] = (applicationsData as ApplicationData[])
          .filter((app: ApplicationData) => app.assignment === course.title)
          .map((app: ApplicationData) => app.email);
        
        return matchingAssignments;
      }
      return [];
  }
  );

  const [professorList, setProfessorList] = useState<string[]>(() => {
    // Get professors_assigned from current course
    return course.professors_assigned;
  }
  );

  const [isAddingProfessor, setIsAddingProfessor] = useState(false);
  const [newProfessor, setNewProfessor] = useState("");
  
  const [isAddingTA, setIsAddingTA] = useState(false);
  const [newTA, setNewTA] = useState("");

  const handleRemoveProfessor = (index: number) => {
    // Remove the professor at the specified index
    const updatedList = professorList.filter((_, i) => i !== index);
    setProfessorList(updatedList); // Update the professorList
  };

  const handleAddProfessor = () => {
    setIsAddingProfessor(true);
    setNewProfessor("");
  };

  const handleProfessorSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewProfessor(event.target.value);
  };

  const handleConfirmProfessor = () => {
    if (newProfessor) {
      const updatedList = [...professorList, newProfessor];
      setProfessorList(updatedList);
  
      // Create a new updated course object with the new professor list
      const updatedCourse = { ...course, professors_assigned: updatedList };
      setCourse(updatedCourse);
  
      setIsAddingProfessor(false);
      setNewProfessor("");
    }
  };
  
  
   
  const handleInputChange = (value: string) => {
    // Update course's capacity as a string for smooth editing
    setCourse({ ...course, capacity: Number(value) });
  };
  
  

  const handleUpdateCourse = () => {
    if (course) {
      // Parse capacity as an integer before saving, default to 0 if parsing fails  
      const courseIndex = courses.findIndex((c) => c.title === course.title);
  
      if (courseIndex !== -1) {
        const updatedCourses = [...courses];
        updatedCourses[courseIndex] = course;
  
        setCourses(updatedCourses);
        localStorage.setItem('courses', JSON.stringify(updatedCourses));
        localStorage.setItem('currentCourse', JSON.stringify(course));
        alert('Course updated successfully.');
      }
    }
  };
  
  
  

  const handleNext = () => {
    if (courses.length === rowNumberVal + 1) {
      alert('There are no next applications!'); // Notify user
    } else {
      const newIndex = rowNumberVal + 1;
      localStorage.setItem("currentRow", newIndex.toString()); // Store the count in localStorage
      
      let nextCourse: Course;
      if (previousPage === "System-Admin-Home") {
        nextCourse = courses[newIndex];
      } else {
        nextCourse = courses[newIndex];
      }
  
      setCourse(nextCourse);
      setProfessorList(nextCourse.professors_assigned);
      setTAList(nextCourse.tas_assigned || []); // Ensure tas_assigned is an array
      
      window.scrollTo(0, 0);
      navigate(`/course-editor`);
    }
  };
  
  const handlePrevious = () => {
    if (rowNumber === '0') {
      alert('There are no prior applications!'); // Notify user
    } else {
      const newIndex = rowNumberVal - 1;
      localStorage.setItem("currentRow", newIndex.toString()); // Store the count in localStorage
  
      const previousCourse: Course = courses[newIndex]; // Fetch previous course
      setCourse(previousCourse);
      setProfessorList(previousCourse.professors_assigned);
      setTAList(previousCourse.tas_assigned || []); // Ensure tas_assigned is an array
      
      window.scrollTo(0, 0);
      navigate(`/course-editor`);
    }
  };
  

 
  const handleBack = () => {
    if(previousPage === "System-Admin-Home"){
      navigate('/system-admin-home');
    }
    else{
      navigate('/course-manager');
    }
  };

  return (
    <div className="ta-assignment-container">
      <Header />
      <img src="/assets/Arrow left.svg" alt="back-arrow" className='back-arrow' onClick={handleBack} />
      <div className="content">
        <div className="application-container">
        <h2>{course.title} Information : Course {rowNumberVal + 1} / {courses.length}</h2>
          <form className="application-form">
            <div className="form-group">
              <label>TA Capacity</label>
              <input
                type="text"
                value={course.capacity}
                onChange={(e) => handleInputChange(e.target.value)}
                maxLength={2}
              />
            </div>

            <div className="extra-space"></div>

            <div className="table-group" style={{marginTop: '50px', marginBottom: '50px'}}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Assigned Professors</h2>
                <button className="submit-preferences-btn" onClick={handleAddProfessor} disabled={isAddingProfessor}>Add Professor</button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Professor Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {professorList.map((professor, index) => (
                    <tr key={index}>
                      <td>{professor}</td>
                      <td>
                        <button className="submit-preferences-btn" onClick={() => handleRemoveProfessor(index)}>Remove</button>
                      </td>
                    </tr>
                  ))}
                  {isAddingProfessor && (
                    <tr>
                      <td>
                        <select value={newProfessor} onChange={handleProfessorSelection}>
                          <option value="">Select Professor</option>
                          {professorOptions.map((prof, index) => (
                            <option key={index} value={prof}>{prof}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button className="submit-preferences-btn" onClick={handleConfirmProfessor} disabled={!newProfessor}>Confirm</button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="table-group" style={{marginTop: '50px', marginBottom: '50px'}}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Assigned TAs</h2>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>TA Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {taList.map((ta, index) => (
                    <tr key={index}>
                      <td>{ta}</td>
                      <td>{taEmails[index]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </form>
          
          <div className="nav-button-group" style={{marginTop: '50px', marginBottom: '10px'}}>
            <button className="navigation-btn" onClick={handlePrevious}>Previous Course</button>
            <button className="navigation-btn" onClick={handleUpdateCourse}>Save Changes</button>
            <button className="navigation-btn" onClick={handleNext}>Next Course</button>
          </div>
        </div>
        
      </div>
      

      <Footer />
    </div>
  );
};


export default CourseEditor;
