import React, { useEffect, useState } from 'react';
import './SystemAdminHome.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

export interface Application {
  semesterAdmitted: string;
  graduatingSemester: string;
  ufGpa: string;
  ufId: string;
  name: string;
  email: string;
  countryOfOrigin: string;
  coursePreferences: string[];
  researchInterests: string;
  travelPlans: string;
  submitted?: boolean;
  semester: string;
  status: string;
  dateSubmitted: string;
  classStanding: string;
  priority: number | null;
}

export interface UrgentApplication {
  student_name: string;
  student_ufl_email: string;
  student_status: string;
  date_added: string;
}

export interface Course {
  prefix: string;
  title: string;
  professors_assigned: string;
  tas_assigned: string;
  enrollment: number;
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
      { prefix: "CIS4301", title: "Databases", professors_assigned: "", tas_assigned: "", enrollment: 110, date_added: "2:20PM, October 28, 2024" },
      { prefix: "COT3100", title: "Discrete Math", professors_assigned: "", tas_assigned: "", enrollment: 250, date_added: "2:10PM, October 28, 2024" },
      { prefix: "COP4600", title: "Operating Systems", professors_assigned: "Alexis Seguro", tas_assigned: "", enrollment: 110, date_added: "2:20PM, October 28, 2024" },
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

  // const handleRowClick = (index: number, tableType: "applications" | "courses", value: string) => {
  //   if (tableType === "applications") {
      
  //     const currentStudent = urgentApplications.filter(app => app.student_name === value);

  //     const selectedApplications = urgentApplications.filter(app => app.student_status !== "Approved" && app.student_status !== "Rejected");
  //     localStorage.setItem("filteredApps", JSON.stringify(selectedApplications));

  //     localStorage.setItem("currentTableEntryCount", (selectedApplications.length).toString()); // Store the count in localStorage
  //     localStorage.setItem("currentRow", index.toString()); // Store the count in localStorage
  //     localStorage.setItem("previousPage", "System-Admin-Home");

  //     localStorage.setItem("currentApp", JSON.stringify(selectedApplications[index+1]));
  //     if(currentStudent[0].student_status === "Pending Review"){
  //       navigate(`/approve-application`); // Use index + 1 for the route
  //     }
  //     else{
  //       navigate(`/assign-student`);
  //     }
      
  //   } else if (tableType === "courses"){
  //     const selectedCourses = courses.filter(course => course.title === value);
  //     localStorage.setItem("currentCourse", JSON.stringify(selectedCourses[0]));

  //     localStorage.setItem("courses", JSON.stringify(courses));

  //     const unassignedCourses = courses.filter(course => course.professors_assigned === "");
  //     localStorage.setItem("filteredCourses", JSON.stringify(unassignedCourses));

  //     const rowCount = courses.filter(course => course.professors_assigned === "").length;
  //     localStorage.setItem("currentTableEntryCount", rowCount.toString()); // Store the count in localStorage
  //     localStorage.setItem("currentRow", index.toString()); // Store the count in localStorage
  //     localStorage.setItem("previousPage", "System-Admin-Home");
  //     navigate(`/course-editor/`); // Use index + 1 for the route
  //   }
  // };

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


  return (
    <div className="ta-assignment-container">
      <Header />

      <div className="content">
        {/* Manage TA Applications Section */}
        <div className="manage-section">
          <h2>Manage TA Applications</h2>
          <p>
            Update the status of applying students who need action.
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
              .sort((a, b) => new Date(b.date_added).getTime() - new Date(a.date_added).getTime())
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
                <th>#</th>
                <th>Prefix</th>
                <th>Title</th>
                <th>Enrollment</th>
                <th>Date Added</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index} onClick={() => navigate(`/course-editor/${course.prefix}`)}>
                  <td>{index + 1}</td> {/* Display index starting from 1 */}
                  <td>{course.prefix}</td>
                  <td>{course.title}</td>
                  <td>{course.enrollment}</td>
                  <td>{course.date_added}</td>
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
