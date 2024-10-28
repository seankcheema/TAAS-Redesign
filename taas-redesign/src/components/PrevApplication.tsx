import React from 'react';
import './PrevApplication.css';
import Header from './Header';
import Footer from './Footer';




const ProfessorHome: React.FC = () =>{


  return (
    <div className="ta-assignment-container">
      <Header />

      <div className="content">
        <div className='prev-application-container'>
            <h2>Fall 2024 Application</h2>
            <p>Semester admitted: Summer 2021</p>
            <p>College Status: Junior</p>
            <p>UF GPA: 3.85</p>
            <p>UF ID: XXXX-XXXX</p>
            <p>Country of Origin: United States of America</p>
            <p>Course Preferences:</p>
            <p>1) COP4600</p>
            <p>2) COP3502C</p>
            <p>3) CDA3101</p>
            <p>4)</p>
            <p>5)</p>
            <p>Research area/teaching interests:</p>
            <p>I am extremely interested in Linux Kernel development and Operating Systems.</p>
            <p>Travel plans:</p>
            <p>N/A</p>
        </div>
      </div>

        <Footer />
        
      
    </div>
    
  );
};

export default ProfessorHome;
