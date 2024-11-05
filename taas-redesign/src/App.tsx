import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import StudentHome from './components/StudentHome';
import ProfessorHome from './components/ProfessorHome';
import SystemAdminHome from './components/SystemAdminHome';
import Course from './components/Course';
import AppReview from './components/AppReview';
import PrevApplication from './components/PrevApplication';
import ApproveApplication from './components/ApproveApplication';
import Apply from './components/Apply';
import AssignStudent from './components/AssignStudent';
import StudentManager from './components/StudentManager';
import CourseManager from './components/CourseManager';
import CourseEditor from './components/CourseEditor';

interface Application {
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

function App() {
  useEffect(() => {
    // Check if applications are already saved in localStorage
    const savedApplications = localStorage.getItem('applicationsData');
    if (!savedApplications) {
      // Define the default applications
      const defaultApplications: Application[] = [
        {
          semesterAdmitted: 'Fall 2023',
          graduatingSemester: 'Spring 2026',
          ufGpa: '3.8',
          ufId: '1234-5678',
          name: 'Student 1',
          email: 'student1@ufl.edu',
          countryOfOrigin: 'USA',
          coursePreferences: ["CAP4630 - Artificial Intelligence", 
    "CNT4007C - Computer Network Fundamentals", 
    "COP4600 - Operating Systems"],
          researchInterests: 'Machine Learning, Data Science',
          travelPlans: 'N/A',
          submitted: true,
          semester: 'Spring 2024',
          status: 'Pending Review',
          dateSubmitted: 'October 31, 2024',
          classStanding: 'Junior',
          priority: null,
        },
        {
          semesterAdmitted: 'Fall 2022',
          graduatingSemester: 'Spring 2025',
          ufGpa: '3.5',
          ufId: '1234-5678',
          name: 'Student 2',
          email: 'student2@ufl.edu',
          countryOfOrigin: 'USA',
          coursePreferences: ["COP3502C - Programming Fundamentals 1", 
          "COP3503C - Programming Fundamentals 2", 
          "CEN3031 - Introduction to Software Engineering",
          "CDA3101 - Introduction to Computer Organization", 
          "COT3100 - Applications of Discrete Structures",
          "COP3530 - Data Structures and Algorithm"],
          researchInterests: 'Software Engineering, Security',
          travelPlans: 'Going home for Thanksgiving and a 3 day trip to Miami',
          submitted: true,
          semester: 'Spring 2024',
          status: 'Pending Review',
          dateSubmitted: 'October 28, 2024',
          classStanding: 'Senior',
          priority: null,
        },
        {
          semesterAdmitted: 'Fall 2023',
          graduatingSemester: 'Fall 2026',
          ufGpa: '3.3',
          ufId: '1234-5678',
          name: 'Student 3',
          email: 'student3@ufl.edu',
          countryOfOrigin: 'USA',
          coursePreferences: ["CIS4301 - Information and Database Systems",
    "CIS4914 - Senior Project", 
    "CAP4410 - Computer Vision"],
          researchInterests: 'Software Engineering, Security',
          travelPlans: 'N/A',
          submitted: true,
          semester: 'Spring 2024',
          status: 'Pending Review',
          dateSubmitted: 'October 27, 2024',
          classStanding: 'Sophomore',
          priority: null,
        },
      ];
      
      // Save the default applications in localStorage
      localStorage.setItem('applicationsData', JSON.stringify(defaultApplications));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/student-home" element={<StudentHome />} />
          <Route path="/professor-home" element={<ProfessorHome />} />
          <Route path="/system-admin-home" element={<SystemAdminHome />} />
          <Route path="/application-manager" element={<StudentManager />} />
          <Route path="/course-editor" element={<CourseEditor />} />
          <Route path="/course-manager" element={<CourseManager />} />
          <Route path="/course/COP4600" element={<Course />} />
          <Route path="/course/COP4600/review" element={<AppReview />} />
          <Route path="/applications/fall-2024" element={<PrevApplication />} />
          <Route path="/review-applications" element={<ApproveApplication />} />
          <Route path="/assign-student" element={<AssignStudent />} />
          <Route path="/apply" element={<Apply />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
