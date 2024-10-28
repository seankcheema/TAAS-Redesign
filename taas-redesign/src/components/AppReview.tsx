import React, { useState } from 'react';
import './AppReview.css';
import Header from './Header';
import Footer from './Footer';

interface Student {
  id: number;
  name: string;
  email: string;
  gpa: number;
  classStanding: string;
  interests: string;
  travelPlans: string;
  priority: number | null; // Keep priority as number or null
}

const AppReview: React.FC = () => {
  const initialStudents: Student[] = [
    {
      id: 1,
      name: 'Student 1',
      email: 'student1@ufl.edu',
      gpa: 3.8,
      classStanding: 'Junior',
      interests: 'Machine Learning, Data Science',
      travelPlans: 'N/A',
      priority: null,
    },
    {
      id: 2,
      name: 'Student 2',
      email: 'student2@ufl.edu',
      gpa: 3.5,
      classStanding: 'Senior',
      interests: 'Software Engineering, Security',
      travelPlans: 'Going home for Thanksgiving and a 3 day trip to Miami',
      priority: null,
    },
    {
      id: 3,
      name: 'Student 3',
      email: 'student3@ufl.edu',
      gpa: 3.3,
      classStanding: 'Sophomore',
      interests: 'Software Engineering, Security',
      travelPlans: 'N/A',
      priority: null,
    },
  ];

  const [students, setStudents] = useState<Student[]>(initialStudents);
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

  const priorityOrder: { [key: number]: number } = { 1: 1, 2: 2, 3: 3, 4: 4 }; // Added a higher number for null

  const handleSortByGpa = () => {
    const sortedStudents = [...students].sort((a, b) =>
      gpaSortOrder === 'asc' ? a.gpa - b.gpa : b.gpa - a.gpa
    );
    setStudents(sortedStudents);
    setGpaSortOrder(gpaSortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortByStanding = () => {
    const sortedStudents = [...students].sort((a, b) => {
      const aOrder = classStandingOrder[a.classStanding];
      const bOrder = classStandingOrder[b.classStanding];
      return standingSortOrder === 'asc' ? aOrder - bOrder : bOrder - aOrder;
    });
    setStudents(sortedStudents);
    setStandingSortOrder(standingSortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortByPriority = () => {
    const sortedStudents = [...students].sort((a, b) => {
      const aPriority = a.priority === null ? 4 : priorityOrder[a.priority]; // Null treated as lowest priority
      const bPriority = b.priority === null ? 4 : priorityOrder[b.priority];
      return prioritySortOrder === 'asc' ? aPriority - bPriority : bPriority - aPriority;
    });
    setStudents(sortedStudents);
    setPrioritySortOrder(prioritySortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handlePriorityChange = (id: number, priority: number | null) => {
    const updatedStudents = students.map(student =>
      student.id === id ? { ...student, priority } : student
    );
    setStudents(updatedStudents);
    setPreferencesSaved(false); // Mark preferences as unsaved when changes are made
  };

  const handleSavePreferences = () => {
    // Here you would typically save to a backend or local storage
    console.log("Preferences saved:", students);
    setPreferencesSaved(true); // Mark preferences as saved
    alert("Preferences saved!");
  };

  const handleSubmitPreferences = () => {
    if (students.every(student => student.priority !== null)) {
      // Logic to submit the preferences
      console.log("Preferences submitted:", students);
      alert("Preferences submitted successfully!");
    } else {
      alert("Please select a priority for all students before submitting.");
    }
  };

  return (
    <div className="ta-assignment-container">
      <Header />
      <div className="content">
        <div className="review-applications-section">
          <h2>Review Applications</h2>
          <table>
            <thead>
              <tr>
                <th className="name-column">Name</th>
                <th className="email-column">Email</th>
                <th className="gpa-column" onClick={handleSortByGpa}>
                  GPA {gpaSortOrder === 'asc' ? '▲' : '▼'}
                </th>
                <th className="standing-column" onClick={handleSortByStanding}>
                  Class Standing {standingSortOrder === 'asc' ? '▲' : '▼'}
                </th>
                <th className="interests-column">Interests</th>
                <th className="travel-column">Travel Plans</th>
                <th className="priority-column" onClick={handleSortByPriority}>
                  Priority {prioritySortOrder === 'asc' ? '▲' : '▼'}
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td className="name-column">{student.name}</td>
                  <td className="email-column">
                    <a href={`mailto:${student.email}`}>{student.email}</a>
                  </td>
                  <td className="gpa-column">{student.gpa.toFixed(2)}</td>
                  <td className="standing-column">{student.classStanding}</td>
                  <td className="interests-column">{student.interests}</td>
                  <td className="travel-column">{student.travelPlans}</td>
                  <td className="priority-column">
                    <select
                      className="priority-dropdown"
                      value={student.priority ?? ''}
                      onChange={(e) => handlePriorityChange(student.id, e.target.value ? parseInt(e.target.value) : null)}
                    >
                      <option value="">Select Priority</option>
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
          {preferencesSaved}
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default AppReview;
