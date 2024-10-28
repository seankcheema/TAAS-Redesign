import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentHome from './components/StudentHome';
import LandingPage from './components/LandingPage';
import ProfessorHome from './components/ProfessorHome';
import SystemAdminHome from './components/SystemAdminHome';
import Course from './components/Course';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/student-home" element={<StudentHome />} />
            <Route path="/professor-home" element={<ProfessorHome />} />
            <Route path="/system-admin-home" element={<SystemAdminHome />} />
            <Route path="/course/COP4600" element={<Course />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
