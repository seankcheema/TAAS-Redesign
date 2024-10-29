import React from 'react';
import './PrevApplication.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';




const ProfessorHome: React.FC = () =>{
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/student-home');    
  }

  return (
    <div className="ta-assignment-container">
      <Header />
      <img src="/assets/Arrow left.svg" alt="back-arrow" className='back-arrow' onClick={handleBack}/>
      <div className="content">
        <div className='prev-application-container'>
            <h2>Fall 2024 Application</h2>
            <p><b>Semester admitted:</b> Summer 2021</p>
            <p><b>Graduating Semester:</b> Spring 2025</p>
            <p><b>UF GPA:</b> 3.85</p>
            <p><b>UF ID:</b> 1234-5678</p>
            <p><b>Country of Origin:</b> United States</p>
            <p><b>Course Preferences:</b></p>
            <p><b>1)</b> COP4600 - Operating Systems</p>
            <p><b>2)</b> COP3502C - Programming Fundamentals 1</p>
            <p><b>3)</b> CDA3101 - Introduction to Computer Organization</p>
            <p><b>4)</b></p>
            <p><b>5)</b></p>
            <p><b>Research area/teaching interests:</b></p>
            <p>I am extremely interested in Linux Kernel development and Operating Systems.</p>
            <p><b>Travel plans:</b></p>
            <p>N/A</p>
        </div>
      </div>

        <Footer />

        
      
    </div>
    
  );
};

export default ProfessorHome;
