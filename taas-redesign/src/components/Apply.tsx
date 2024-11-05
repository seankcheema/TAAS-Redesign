import React, { useEffect, useState } from 'react';
import './Apply.css';
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


const Apply: React.FC = () => {
  const [application, setApplication] = useState<Application>({
    semesterAdmitted: '',
    graduatingSemester: '',
    ufGpa: '',
    ufId: '',
    name: 'New Student',
    email: 'new_student@ufl.edu',
    countryOfOrigin: '',
    coursePreferences: Array(5).fill(''),
    researchInterests: '',
    travelPlans: '',
    submitted: false,
    semester: 'Spring 2025',
    status: 'In Progress',
    dateSubmitted: '',
    classStanding: '', // Initialize class standing
    priority: null,
});


  const navigate = useNavigate();

  useEffect(() => {
    // Load application data from local storage on component mount
    const savedApplication = localStorage.getItem('applicationData');
    if (savedApplication) {
        const parsedApplication = JSON.parse(savedApplication);
        setApplication(parsedApplication);
    }
}, []);

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
    const updatedPreferences = [...application.coursePreferences];
    updatedPreferences[index] = value;
    setApplication((prev) => ({
      ...prev,
      coursePreferences: updatedPreferences,
    }));
  };

  const handleInputChange = (key: keyof Application, value: string) => {
    setApplication((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const importLatestApplication = () => {
    setApplication({
        semesterAdmitted: 'Summer 2021',
        graduatingSemester: 'Spring 2025',
        ufGpa: '3.85',
        ufId: '1234-5678',
        name: 'New Student',
        email: 'new_student@ufl.edu',
        countryOfOrigin: 'United States',
        coursePreferences: [
            'COP4600 - Operating Systems',
            'COP3502C - Programming Fundamentals 1',
            'CDA3101 - Introduction to Computer Organization',
            '',
            '',
        ],
        researchInterests: 'I am extremely interested in Linux Kernel development and Operating Systems.',
        travelPlans: 'N/A',
        submitted: false,
        semester: 'Spring 2025',
        status: 'Under Consideration',
        dateSubmitted: '',
        classStanding: 'Senior', // Set class standing
        priority: null,
    });
};


  const saveApplication = () => {
    // Save to local storage (optional)
    localStorage.setItem('applicationData', JSON.stringify(application));
    alert('Application saved!'); // Notify user
  };

  const submitApplication = () => {
    // Here you can send application to your server
    console.log("Submitting application data:", application);

    // Save to local storage, mark as submitted
    application.status = 'Pending Review';
    application.dateSubmitted = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });    
    const applicationData = { ...application, submitted: true };
    localStorage.setItem('applicationData', JSON.stringify(applicationData));

    // Retrieve existing applications from localStorage, or initialize an empty array if none exist
    const savedApplications = JSON.parse(localStorage.getItem('applicationsData') || '[]');

    // Add the new application to the array
    const updatedApplications = [...savedApplications, applicationData];

    // Save the updated array back to localStorage
    localStorage.setItem('applicationsData', JSON.stringify(updatedApplications));


    alert("Application submitted successfully!"); // Notify user

    // Optionally, you can navigate back to the StudentHome after submission
    navigate('/student-home');

    handleBack();
};


  const availableCourses = (selectedIndex: number) =>
    ciseCourses.filter((course) => !application.coursePreferences.includes(course) || application.coursePreferences[selectedIndex] === course);

  const handleBack = () => {
    navigate('/student-home');
  };

  return (
    <div className="ta-assignment-container">
      <Header />
      <img src="/assets/Arrow left.svg" alt="back-arrow" className='back-arrow' onClick={handleBack} />
      <div className="content">
        <div className="application-container">
          <h2>Spring 2025 Application</h2>
          <button className="import-latest-button" onClick={importLatestApplication}>Import Latest Application</button>

          <form className="application-form">
            <div className="form-group">
              <label>Semester Admitted:</label>
              <select
                value={application.semesterAdmitted}
                onChange={(e) => handleInputChange('semesterAdmitted', e.target.value)}
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
                value={application.graduatingSemester} // Adjusted to use application state
                onChange={(e) => handleInputChange('graduatingSemester', e.target.value)} // Update the state accordingly
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
              <label>Class Standing:</label>
              <select
                  value={application.classStanding} // Bind to application state
                  onChange={(e) => handleInputChange('classStanding', e.target.value)} // Update state accordingly
              >
                  <option value="">Select Class Standing</option>
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                  <option value="Graduate">Graduate</option>
              </select>
          </div>

            <div className="form-group">
              <label>UF GPA:</label>
              <input
                type="text"
                value={application.ufGpa}
                onChange={(e) => handleInputChange('ufGpa', e.target.value)}
                maxLength={4}
              />
            </div>

            <div className="form-group">
              <label>UF ID: XXXX-XXXX</label>
              <input
                type="text"
                value={application.ufId}
                onChange={(e) => handleInputChange('ufId', e.target.value)}
                placeholder="XXXX-XXXX"
                maxLength={9}
              />
            </div>

            <div className="form-group">
              <label>Country of Origin:</label>
              <select
                value={application.countryOfOrigin}
                onChange={(e) => handleInputChange('countryOfOrigin', e.target.value)}
              >
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
              {application.coursePreferences.map((preference, i) => (
                <select
                  key={i}
                  value={preference}
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
                value={application.researchInterests}
                onChange={(e) => handleInputChange('researchInterests', e.target.value)}
                maxLength={150}
              />
              <small>{150 - application.researchInterests.length} characters remaining</small>
            </div>

            <div className="form-group">
              <label>Travel Plans (N/A if none):</label>
              <textarea
                value={application.travelPlans}
                onChange={(e) => handleInputChange('travelPlans', e.target.value)}
                maxLength={150}
              />
              <small>{150 - application.travelPlans.length} characters remaining</small>
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
