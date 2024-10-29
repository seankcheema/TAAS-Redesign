import React, { useState } from 'react';
import './Apply.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Apply: React.FC = () => {
  const [semesterAdmitted, setSemesterAdmitted] = useState<string>('');
  const [graduatingSemester, setGraduatingSemester] = useState<string>('');
  const [ufGpa, setUfGpa] = useState<string>('');
  const [ufId, setUfId] = useState<string>('');
  const [countryOfOrigin, setCountryOfOrigin] = useState<string>('');
  const [coursePreferences, setCoursePreferences] = useState<string[]>(['', '', '', '', '']);
  const [researchInterests, setResearchInterests] = useState<string>('');
  const [travelPlans, setTravelPlans] = useState<string>('');

  const countries = [
    "United States", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia",
    "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
    "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
    "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the", "Costa Rica", "Cote d'Ivoire", "Croatia",
    "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
    "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
    "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
    "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait",
    "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
    "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
    "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman",
    "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
    "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
    "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
    "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan",
    "Sudan, South", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
    "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda",
    "Ukraine", "United Arab Emirates", "United Kingdom",  "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
    "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  const ciseCourses = [
    "COP3502C - Programming Fundamentals 1", 
    "COP3503C - Programming Fundamentals 2", 
    "CEN3031 - Introduction to Software Engineering",
    "CDA3101 - Introduction to Computer Organization", 
    "COT3100 - Applications of Discrete Structures",
    "COP3530 - Data Structures and Algorithm", 
    "CIS4301 - Information and Database Systems",
    "CIS4914 - Senior Project", 
    "CAP4410 - Computer Vision", 
    "CAP4630 - Artificial Intelligence", 
    "CNT4007C - Computer Network Fundamentals", 
    "COP4600 - Operating Systems",
  ];

  const handleCoursePreferenceChange = (index: number, value: string) => {
    const updatedPreferences = [...coursePreferences];
    updatedPreferences[index] = value;
    setCoursePreferences(updatedPreferences);
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/student-home');    
  }

  const availableCourses = (selectedIndex: number) =>
    ciseCourses.filter((course) => !coursePreferences.includes(course) || coursePreferences[selectedIndex] === course);

  const importLatestApplication = () => {
    setSemesterAdmitted('Summer 2021');
    setGraduatingSemester('Spring 2025');
    setUfGpa('3.85');
    setUfId('1234-5678');
    setCountryOfOrigin('United States of America');
    setCoursePreferences(['COP4600 - Operating Systems', 'COP3502C - Programming Fundamentals 1', 'CDA3101 - Introduction to Computer Organization', '', '']);
    setResearchInterests('I am extremely interested in Linux Kernel development and Operating Systems.');
    setTravelPlans('N/A');
  };

  const saveApplication = () => {
    // Logic to save application (e.g., save to local storage or database)
    alert("Application saved!");
  };

  const submitApplication = () => {
    // Logic to submit application (e.g., send to server)
    alert("Application submitted successfully!");
  };

  return (
    <div className="ta-assignment-container">
      <Header />
        <img src="/assets/Arrow left.svg" alt="back-arrow" className='back-arrow' onClick={handleBack}/>
      <div className="content">
        <div className="application-container">
          <h2>Spring 2025 Application</h2>
          <button className="import-latest-button" onClick={importLatestApplication}>Import Latest Application</button>
          
          <form className="application-form">
          <div className="form-group">
            <label>Semester Admitted:</label>
            <select
                value={semesterAdmitted}
                onChange={(e) => setSemesterAdmitted(e.target.value)}
            >
                <option value="">Select Semester</option>
                <option value="Fall 2024">Fall 2024</option>
                <option value="Summer 2024">Summer 2024</option>
                <option value="Spring 2024">Spring 2024</option>
                <option value="Fall 2023">Fall 2023</option>
                <option value="Summer 2023">Summer 2023</option>
                <option value="Spring 2023">Spring 2023</option>
                <option value="Fall 2022">Fall 2022</option>
                <option value="Summer 2022">Summer 2022</option>
                <option value="Spring 2022">Spring 2022</option>
                <option value="Fall 2021">Fall 2021</option>
                <option value="Summer 2021">Summer 2021</option>
                <option value="Spring 2021">Spring 2021</option>
                <option value="Fall 2020">Fall 2020</option>
                <option value="Summer 2020">Summer 2020</option>
            </select>
            </div>

            <div className="form-group">
                <label>Graduating Semester:</label>
                <select
                    value={graduatingSemester} // Assuming you have a state for this
                    onChange={(e) => setGraduatingSemester(e.target.value)} // Update the state accordingly
                >
                    <option value="">Select Graduating Semester</option>
                    <option value="Spring 2025">Spring 2025</option>
                    <option value="Summer 2025">Summer 2025</option>
                    <option value="Fall 2025">Fall 2025</option>
                    <option value="Spring 2026">Spring 2026</option>
                    <option value="Summer 2026">Summer 2026</option>
                    <option value="Fall 2026">Fall 2026</option>
                    <option value="Spring 2027">Spring 2027</option>
                    <option value="Summer 2027">Summer 2027</option>
                    <option value="Fall 2027">Fall 2027</option>
                    <option value="Spring 2028">Spring 2028</option>
                    <option value="Summer 2028">Summer 2028</option>
                </select>
                </div>

            
            <div className="form-group">
              <label>UF GPA:</label>
              <input
                type="text"
                value={ufGpa}
                onChange={(e) => setUfGpa(e.target.value)}
                maxLength={4}
              />
            </div>
            
            <div className="form-group">
              <label>UF ID: XXXX-XXXX</label>
              <input
                type="text"
                value={ufId}
                onChange={(e) => setUfId(e.target.value)}
                placeholder="XXXX-XXXX"
                maxLength={9}
              />
            </div>
            
            <div className="form-group">
              <label>Country of Origin:</label>
              <select value={countryOfOrigin} onChange={(e) => setCountryOfOrigin(e.target.value)}>
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Course Preferences:</label>
              {[0, 1, 2, 3, 4].map((i) => (
                <select
                  key={i}
                  value={coursePreferences[i]}
                  onChange={(e) => handleCoursePreferenceChange(i, e.target.value)}
                >
                  <option value="">Select #{i + 1} Course Preference</option>
                  {availableCourses(i).map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              ))}
            </div>
            
            <div className="form-group">
              <label>Research Area/Teaching Interests:</label>
              <textarea
                value={researchInterests}
                onChange={(e) => setResearchInterests(e.target.value)}
                maxLength={150}
              />
              <small>{150 - researchInterests.length} characters remaining</small>
            </div>
            
            <div className="form-group">
              <label>Travel Plans (N/A if none):</label>
              <textarea
                value={travelPlans}
                onChange={(e) => setTravelPlans(e.target.value)}
                maxLength={150}
              />
              <small>{150 - travelPlans.length} characters remaining</small>
            </div>
          </form>
          <div className="button-group">
              <button className="save-preferences-btn" onClick={saveApplication}>Save Application</button>
              <button className="submit-preferences-btn" onClick={submitApplication}>Submit Application</button>
        </div>
        </div>

        
      </div>

      <Footer />
    </div>
  );
};

export default Apply;
