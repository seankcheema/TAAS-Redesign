import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentHome from './components/StudentHome';
import LandingPage from './components/LandingPage';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<StudentHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
