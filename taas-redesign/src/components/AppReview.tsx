import React, { useState, useEffect } from 'react';
import './AppReview.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

interface Application {
  semesterAdmitted: string;
  graduatingSemester: string;
  ufGpa: string;
  ufId: string;
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


const AppReview: React.FC = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [gpaSortOrder, setGpaSortOrder] = useState<'asc' | 'desc'>('asc');
  const [standingSortOrder, setStandingSortOrder] = useState<'asc' | 'desc'>('asc');
  const [prioritySortOrder, setPrioritySortOrder] = useState<'asc' | 'desc'>('asc');
  const [preferencesSaved, setPreferencesSaved] = useState<boolean>(false);

  const classStandingOrder: { [key: string]: number } = {
    'Freshman': 1,
    'Sophomore': 2,
    'Junior': 3,
    'Senior': 4,
    'Graduate': 5,
  };

  const priorityOrder: { [key: number]: number } = { 1: 1, 2: 2, 3: 3, 4: 4 };

  useEffect(() => {
    // Load applications from localStorage
    const savedApplications = localStorage.getItem('applicationsData');
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }
  }, []);

  const handleBack = () => {
    navigate('/professor-home');
  };

  const handleSortByGpa = () => {
    const sortedApplications = [...applications].sort((a, b) =>
      gpaSortOrder === 'asc' ? parseFloat(a.ufGpa) - parseFloat(b.ufGpa) : parseFloat(b.ufGpa) - parseFloat(a.ufGpa)
    );
    setApplications(sortedApplications);
    setGpaSortOrder(gpaSortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortByStanding = () => {
    const sortedApplications = [...applications].sort((a, b) => {
      const aOrder = classStandingOrder[a.classStanding];
      const bOrder = classStandingOrder[b.classStanding];
      return standingSortOrder === 'asc' ? aOrder - bOrder : bOrder - aOrder;
    });
    setApplications(sortedApplications);
    setStandingSortOrder(standingSortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortByPriority = () => {
    const sortedApplications = [...applications].sort((a, b) => {
      const aPriority = a.priority === null ? 4 : priorityOrder[a.priority];
      const bPriority = b.priority === null ? 4 : priorityOrder[b.priority];
      return prioritySortOrder === 'asc' ? aPriority - bPriority : bPriority - aPriority;
    });
    setApplications(sortedApplications);
    setPrioritySortOrder(prioritySortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handlePriorityChange = (ufId: string, priority: number | null) => {
    const updatedApplications = applications.map(app =>
      app.ufId === ufId ? { ...app, priority } : app
    );
    setApplications(updatedApplications);
    setPreferencesSaved(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('applicationsData', JSON.stringify(applications));
    setPreferencesSaved(true);
    alert("Preferences saved!");
  };

  const handleSubmitPreferences = () => {
    if (applications.every(app => app.priority !== null)) {
      localStorage.setItem('applicationsData', JSON.stringify(applications));
      alert("Preferences submitted successfully!");
      navigate('/professor-home');
    } else {
      alert("Please select a priority for all applications before submitting.");
    }
  };

  return (
    <div className="ta-assignment-container">
      <Header />
      <img src="/assets/Arrow left.svg" alt="back-arrow" className='back-arrow' onClick={handleBack}/>
      <div className="content">
        <div className="review-applications-section">
          <h2>Review Applications</h2>
          <table>
            <thead>
              <tr>
                <th className="name-column">UF ID</th>
                <th className="email-column">Country</th>
                <th className="gpa-column" onClick={handleSortByGpa}>
                  GPA {gpaSortOrder === 'asc' ? '▲' : '▼'}
                </th>
                <th className="standing-column" onClick={handleSortByStanding}>
                  Class Standing {standingSortOrder === 'asc' ? '▲' : '▼'}
                </th>
                <th className="semester-column">Graduating Semester</th>
                <th className="interests-column">Research Interests</th>
                <th className="travel-column">Travel Plans</th>
                <th className="priority-column" onClick={handleSortByPriority}>
                  Priority {prioritySortOrder === 'asc' ? '▲' : '▼'}
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.ufId}>
                  <td className="name-column">{app.ufId}</td>
                  <td className="email-column">{app.countryOfOrigin}</td>
                  <td className="gpa-column">{parseFloat(app.ufGpa).toFixed(2)}</td>
                  <td className="standing-column">{app.classStanding}</td>
                  <td className="semester-column">{app.graduatingSemester}</td>
                  <td className="interests-column">{app.researchInterests}</td>
                  <td className="travel-column">{app.travelPlans}</td>
                  <td className="priority-column">
                    <select
                      className="priority-dropdown"
                      value={app.priority ?? ''}
                      onChange={(e) => handlePriorityChange(app.ufId, e.target.value ? parseInt(e.target.value) : null)}
                    >
                      <option value="">Select</option>
                      <option value="1">1 - High</option>
                      <option value="2">2 - Medium</option>
                      <option value="3">3 - Low</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="buttons-container">
            <button className="save-preferences-btn" onClick={handleSavePreferences}>
              Save Preferences
            </button>
            <button 
              className="submit-preferences-btn" 
              onClick={handleSubmitPreferences}
            >
              Submit Preferences
            </button>
          </div>
          {preferencesSaved && <div>Preferences saved!</div>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppReview;
