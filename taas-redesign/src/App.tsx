import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentHome from './components/StudentHome';
import LandingPage from './components/LandingPage';
import ProfessorHome from './components/ProfessorHome';
import SystemAdminHome from './components/SystemAdminHome';
import Course from './components/Course';
import AppReview from './components/AppReview';
import PrevApplication from './components/PrevApplication';
import ApproveApplication from './components/ApproveApplication';
import Apply from './components/Apply';
import AssignStudent from './components/AssignStudent'
import StudentManager from './components/StudentManager';
import CourseManager from './components/CourseManager';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/student-home" element={<StudentHome />} />
            <Route path="/professor-home" element={<ProfessorHome />} />
            <Route path="/system-admin-home" element={<SystemAdminHome />} />
            <Route path="/student-manager" element={<StudentManager />} />
            <Route path="/course-manager" element={<CourseManager />} />
            <Route path="/course/COP4600" element={<Course />} />
            <Route path="/course/COP4600/review" element={<AppReview />} />
            <Route path="/applications/fall-2024" element={<PrevApplication />} />
            <Route path="/approve-applications/fall-2024" element={<ApproveApplication />} />
            <Route path="/assign-student/1" element={<AssignStudent />} />
            <Route path="/apply" element={<Apply />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
