import React, { useEffect, useState } from 'react';
import './SystemAdminHome.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { Application } from './Apply';


export interface UrgentApplication {
  student_name: string;
  student_ufl_email: string;
  student_status: string;
  date_added: string;
}

export interface Course {
  prefix: string;
  title: string;
  professors_assigned: string[];
  tas_assigned: string[];
  capacity: number;
  date_added: string;
}

const SystemAdminHome: React.FC = () => {


  const [applicationsData, setApplicationsData] = useState<Application[]>(() => {
    const storedApplications = localStorage.getItem('applicationsData');
    return storedApplications ? JSON.parse(storedApplications) : [];
  });

  const [urgentApplications, setUrgentApplicationsData] = useState<UrgentApplication[]>(() => {
    const storedApplications = localStorage.getItem('applicationsData');
    if (storedApplications) {
      const applications: Application[] = JSON.parse(storedApplications);
      // Filter applications for urgent applications
      return applications
        .filter(app => app.status === 'Pending Review')
        .map(app => ({
          student_name: app.name, 
          student_ufl_email: app.email, 
          student_status: app.status,
          date_added: app.dateSubmitted, 
        }));
    }
    return [];
  });

  localStorage.setItem('urgentapplications', JSON.stringify(urgentApplications));

  const [courses, setCourses] = useState<Course[]>(() => {
    const storedCourses = localStorage.getItem('courses');
    return storedCourses ? JSON.parse(storedCourses) : [
      {title: "CIS4301 - Information and Database Systems", professors_assigned: [], tas_assigned: "", capacity: 12, date_added: "October 28, 2024" },
      {title: "COT3100 - Applications of Discrete Structures", professors_assigned: [], tas_assigned: "", capacity: 15, date_added: "October 28, 2024" },
      {title: "COP4600 - Operating Systems", professors_assigned: ["Alexandre Gomes de Siqueira"], tas_assigned: "", capacity: 22, date_added: "October 28, 2024" },
    ];
  });

  

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('applicationsData', JSON.stringify(applicationsData));
    localStorage.setItem('courses', JSON.stringify(courses));

    // Filter applications with status "Pending Review" and store them as urgentApplications
    localStorage.setItem('urgentapplications', JSON.stringify(urgentApplications));
  }, [applicationsData, courses]);

  const handleAllTAs = () => {
    navigate('/application-manager');    
  };

  const handleAllCourses = () => {
    navigate('/course-manager');    
  };

  const handleReview = (index: number, value: string) => {
    const currentStudent = urgentApplications.filter(app => app.student_ufl_email === value);

      const selectedApplications = urgentApplications.filter(app => app.student_status !== "Approved" && app.student_status !== "Rejected");
      localStorage.setItem("filteredApps", JSON.stringify(selectedApplications));

      localStorage.setItem("currentTableEntryCount", (selectedApplications.length).toString()); // Store the count in localStorage
      localStorage.setItem("currentRow", index.toString()); // Store the count in localStorage
      localStorage.setItem("previousPage", "System-Admin-Home");

      localStorage.setItem("currentApp", JSON.stringify(selectedApplications[index+1]));
      if(currentStudent[0].student_status === "Pending Review"){
        navigate(`/review-applications`); // Use index + 1 for the route
      }
      else{
        navigate(`/assign-student`);
      }
  };

  const handleCourseReview = (index: number, value: string) => {
      const selectedCourses = courses.filter(course => course.title === value);
      localStorage.setItem("currentCourse", JSON.stringify(selectedCourses[0]));

      localStorage.setItem("courses", JSON.stringify(courses));
      localStorage.setItem("currentRow", index.toString()); // Store the count in localStorage
      localStorage.setItem("previousPage", "System-Admin-Home");
      navigate(`/course-editor/`); // Use index + 1 for the route 
  };


  return (
    <div className="ta-assignment-container">
      <Header />

      <div className="content">
        {/* Manage TA Applications Section */}
        <div className="manage-section">
          <h2>Manage TA Applications</h2>
          <p>
            Update the status of applying students who need action. There are currently <a>{urgentApplications.length}</a> applications that require review.
          </p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Date Submitted</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {urgentApplications
              .slice(0, 3)
              .map((UA, index) => (
                <tr key={index}>
                  <td>{UA.student_name}</td>
                  <td>{UA.student_status}</td>
                  <td>{UA.date_added}</td>
                  <td>
                    <button className="review-btn" onClick={() => handleReview(index, UA.student_ufl_email)}>Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="wider-btn" onClick={handleAllTAs}>Show All TA Applications</button>
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
                <th>Course</th>
                <th>Professors Assigned</th>
                <th>Capacity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.title}</td>
                  <td>{course.professors_assigned.join(', ')}</td>
                  <td>{course.capacity}</td>
                  <td>
                    <button className="review-btn" onClick={() => handleCourseReview(index, course.title)}>Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="wider-btn" onClick={handleAllCourses}>Show All Professor Assignments</button>
        </div>
        
      </div>

      <Footer />
    </div>
  );
};

export default SystemAdminHome;
