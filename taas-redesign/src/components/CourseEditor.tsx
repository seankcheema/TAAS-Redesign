import React, { useEffect, useState } from 'react';
import './Apply.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import {Course} from './SystemAdminHome'

export interface Application {
    semesterAdmitted: string;
    graduatingSemester: string;
    ufGpa: string;
    ufId: string;
    countryOfOrigin: string;
    coursePreferences: string[];
    researchInterests: string;
    travelPlans: string;
    submitted?: boolean;
    semester: string;
    status: string;
    dateSubmitted: string;
    classStanding: string;
}

const CourseEditor: React.FC = () => {
  // Example list of professors for the dropdown
  const professorOptions = ["Dr. Smith", "Prof. Johnson", "Dr. Lee", "Prof. Martinez", "Dr. Brown"];
  const taOptions = ["TA Jane", "TA John", "TA Emma", "TA Lucas", "TA Olivia"];

  const [application, setApplication] = useState<Application>({
    semesterAdmitted: '',
    graduatingSemester: '',
    ufGpa: '',
    ufId: '',
    countryOfOrigin: '',
    coursePreferences: Array(5).fill(''),
    researchInterests: '',
    travelPlans: '',
    submitted: false,
    semester: 'Spring 2025',
    status: 'In Progress',
    dateSubmitted: '',
    classStanding: '', // Initialize class standing
});

  const navigate = useNavigate();

  const [course, setCourse] = useState<Course>(() => {
    const savedCourse = localStorage.getItem('currentCourse');
    return savedCourse ? JSON.parse(savedCourse) : null;
  });

  // Separate state for professors and TAs
  const [professorList, setProfessorList] = useState<string[]>(() =>
    course.professors_assigned ? course.professors_assigned.split(',').map(name => name.trim()) : []
  );

  const [taList, setTAList] = useState<string[]>(() =>
    course.tas_assigned ? course.tas_assigned.split(',').map(name => name.trim()) : []
  );

  const [isAddingProfessor, setIsAddingProfessor] = useState(false);
  const [newProfessor, setNewProfessor] = useState("");
  
  const [isAddingTA, setIsAddingTA] = useState(false);
  const [newTA, setNewTA] = useState("");

  // Update localStorage whenever professorList or taList changes
  useEffect(() => {
    const updatedCourse = { 
      ...course, 
      professors: professorList.join(', '), 
      tas: taList.join(', ') 
    };
    setCourse(updatedCourse);
    localStorage.setItem('currentCourse', JSON.stringify(updatedCourse));
  }, [professorList, taList]);

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
      setProfessorList([...professorList, newProfessor]);
      setIsAddingProfessor(false);
      setNewProfessor("");
    }
  };
  
  // Handle Add, Confirm, and Remove for TAs
  const handleAddTA = () => {
    setIsAddingTA(true);
    setNewTA("");
  };

  const handleConfirmTA = () => {
    if (newTA) {
      setTAList([...taList, newTA]);
      setIsAddingTA(false);
      setNewTA("");
    }
  };

  const handleTASelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTA(event.target.value);
  };

  const handleRemoveTA = (index: number) => {
    const updatedList = taList.filter((_, i) => i !== index);
    setTAList(updatedList);
  };
  

  const handleInputChange = (key: keyof Application, value: string) => {
    setApplication((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Load application data from localStorage on initial render
  const [courses, setCourses] = useState<Course[]>(() => {
    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
      const parsedCourses = JSON.parse(storedCourses);
      return parsedCourses;
    }
    return null; // Return null if no applications found
  });

  const handleUpdateCourse = () => {
    if (course) {
      course.professors_assigned = professorList.join(',');
      course.tas_assigned = taList.join(',');
      // Create a new array with the updated status for the first application
      const updatedCourses = courses.map((courseOriginal) => {
        if (courseOriginal.prefix === course.prefix) { // Update the first application (index 0)
          alert(course.professors_assigned + " and " + course.tas_assigned)
          return { ...courseOriginal, professors_assigned: course.professors_assigned, tas_assigned: course.tas_assigned }; // Update status
        }
        return courseOriginal; // Return unchanged application for other indices
      });
  
      // Update the state with the new applications array
      setCourses(updatedCourses);
      // Update localStorage with the new applications array
      localStorage.setItem('currentCourse', JSON.stringify(course)); 
      localStorage.setItem('courses', JSON.stringify(updatedCourses)); 

  
      alert('Updated course.');
    }
  };

  const enrollment = course.enrollment.toString();

 
  const handleBack = () => {
    navigate('/system-admin-home');
  };

  return (
    <div className="ta-assignment-container">
      <Header />
      <img src="/assets/Arrow left.svg" alt="back-arrow" className='back-arrow' onClick={handleBack} />
      <div className="content">
        <div className="application-container">
        <h2>{course.prefix} - {course.title} Information</h2>
        <p>Course Prefix: {course.prefix}</p>
        <p>Course Name: {course.title}</p>
        <p>Enrollment: {course.enrollment}</p>
          <form className="application-form">
            <div className="form-group">
              <label>TA Capacity</label>
              <input
                type="text"
                value={application.ufId}
                onChange={(e) => handleInputChange('ufId', e.target.value)}
                placeholder='22'
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
                    <th>#</th>
                    <th>Professor Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {professorList.map((professor, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{professor}</td>
                      <td>
                        <button className="submit-preferences-btn" onClick={() => handleRemoveProfessor(index)}>Remove</button>
                      </td>
                    </tr>
                  ))}
                  {isAddingProfessor && (
                    <tr>
                      <td>{professorList.length + 1}</td>
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
                <button className="submit-preferences-btn" onClick={handleAddTA} disabled={isAddingTA}>Add TA</button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>TA Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {taList.map((ta, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{ta}</td>
                      <td>
                        <button className="submit-preferences-btn" onClick={() => handleRemoveTA(index)}>Remove</button>
                      </td>
                    </tr>
                  ))}
                  {isAddingTA && (
                    <tr>
                      <td>{professorList.length + 1}</td>
                      <td>
                        <select value={newTA} onChange={handleTASelection}>
                          <option value="">Select TA</option>
                          {taOptions.map((ta, index) => (
                            <option key={index} value={ta}>{ta}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button className="submit-preferences-btn" onClick={handleConfirmTA} disabled={!newTA}>Confirm</button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </form>
          <div className="button-group">
            <button className="submit-preferences-btn" onClick={handleUpdateCourse}>Update Course</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};


export default CourseEditor;
