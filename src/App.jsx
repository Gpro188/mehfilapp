import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import createContextHook from '@nkzw/create-context-hook';
import LandingPage from './LandingPage';
import { saveToLocalStorage, loadFromLocalStorage } from './utils/localStorage';
import SearchAndFilter from './components/SearchAndFilter';
import TopPerformers from './components/TopPerformers';
import EventSwitcher from './components/EventSwitcher';
import TeamStandings from './components/TeamStandings';
import ResultsDisplay from './components/ResultsDisplay';
import AdminHeader from './components/AdminHeader';
import AdminTabs from './components/AdminTabs';
import DashboardOverview from './components/DashboardOverview';

// Global styles
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, #6e45e2, #88d3ce);
    min-height: 100vh;
  }
`;

// Styled components
const AppContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #6e45e2, #88d3ce);
`;

const Header = styled.header`
  background: linear-gradient(135deg, #6e45e2, #88d3ce);
  color: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Subtitle = styled.p`
  margin: 10px 0 0 0;
  font-size: 1.2rem;
  opacity: 0.9;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
`;

const ViewToggle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  gap: 10px;
`;

const ViewButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 30px;
  background: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.active ? '#6e45e2' : '#ffffff'};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${props => props.active ? '#f0f0f0' : 'rgba(255, 255, 255, 0.3)'};
  }
`;

// Mock data for demonstration
const mockEvents = [
  { id: '1', name: 'Annual Arts Festival 2025', isActive: true, themeColor: '#6e45e2', logo: null },
  { id: '2', name: 'Winter Cultural Fest', isActive: true, themeColor: '#ff6b6b', logo: null },
];

const mockTeams = [
  { id: '1', name: 'Blue Dragons', color: '#3498db' },
  { id: '2', name: 'Red Phoenix', color: '#e74c3c' },
  { id: '3', name: 'Green Tigers', color: '#2ecc71' },
  { id: '4', name: 'Yellow Eagles', color: '#f1c40f' },
];

const mockCategories = ['Sub Junior', 'Junior', 'Senior'];

const mockPrograms = [
  { id: '1', name: 'Classical Dance', type: 'individual', points: { '1st': 10, '2nd': 7, '3rd': 5 } },
  { id: '2', name: 'Group Song', type: 'group', points: { '1st': 15, '2nd': 10, '3rd': 7 } },
  { id: '3', name: 'Poetry Recitation', type: 'individual', points: { '1st': 8, '2nd': 5, '3rd': 3 } },
];

const mockStudents = [
  { id: '1', name: 'Alice Johnson', teamId: '1', category: 'Junior' },
  { id: '2', name: 'Bob Smith', teamId: '2', category: 'Senior' },
  { id: '3', name: 'Charlie Brown', teamId: '3', category: 'Sub Junior' },
  { id: '4', name: 'Diana Prince', teamId: '1', category: 'Junior' },
];

const mockResults = [
  { id: '1', programId: '1', studentId: '1', position: '1st', grade: 'A' },
  { id: '2', programId: '2', teamId: '2', position: '2nd' },
  { id: '3', programId: '3', studentId: '3', position: '3rd', grade: 'B' },
];

// Create context for app state
const [useAppState, AppStateProvider] = createContextHook(() => {
  const [currentView, setCurrentView] = useState('public');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  
  // Load data from localStorage or use mock data
  const [events, setEvents] = useState(() => 
    loadFromLocalStorage('events', mockEvents)
  );
  const [teams, setTeams] = useState(() => 
    loadFromLocalStorage('teams', mockTeams)
  );
  const [categories] = useState(mockCategories);
  const [programs, setPrograms] = useState(() => 
    loadFromLocalStorage('programs', mockPrograms)
  );
  const [students, setStudents] = useState(() => 
    loadFromLocalStorage('students', mockStudents)
  );
  const [results, setResults] = useState(() => 
    loadFromLocalStorage('results', mockResults)
  );
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage('events', events);
  }, [events]);
  
  useEffect(() => {
    saveToLocalStorage('teams', teams);
  }, [teams]);
  
  useEffect(() => {
    saveToLocalStorage('programs', programs);
  }, [programs]);
  
  useEffect(() => {
    saveToLocalStorage('students', students);
  }, [students]);
  
  useEffect(() => {
    saveToLocalStorage('results', results);
  }, [results]);

  // Get active events
  const activeEvents = events.filter(event => event.isActive);
  
  // Get current active event
  const currentActiveEvent = activeEvents[activeEventIndex] || activeEvents[0];

  return {
    currentView,
    setCurrentView,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    events,
    setEvents,
    teams,
    setTeams,
    categories,
    programs,
    setPrograms,
    students,
    setStudents,
    results,
    setResults,
    activeEvents,
    currentActiveEvent,
    activeEventIndex,
    setActiveEventIndex,
  };
});

// Public View Components
const PublicView = () => {
  const { 
    teams, 
    students, 
    results, 
    programs, 
    categories,
    activeEvents, 
    currentActiveEvent, 
    activeEventIndex, 
    setActiveEventIndex 
  } = useAppState();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    teamId: null,
    category: null
  });
  
  // Cycle through active events
  const handleNextEvent = () => {
    setActiveEventIndex((prev) => (prev + 1) % activeEvents.length);
  };

  // Calculate team standings
  const calculateTeamStandings = () => {
    const standings = teams.map(team => {
      let totalPoints = 0;
      
      // Find results for this team
      results.forEach(result => {
        const program = programs.find(p => p.id === result.programId);
        if (program) {
          // For individual programs, check if student belongs to team
          if (program.type === 'individual') {
            const student = students.find(s => s.id === result.studentId);
            if (student && student.teamId === team.id) {
              const points = program.points[result.position] || 0;
              totalPoints += points;
              
              // Add grade points if applicable
              if (result.grade === 'A') totalPoints += 2;
              else if (result.grade === 'B') totalPoints += 1;
            }
          } 
          // For group programs, check if result is for this team
          else if (result.teamId === team.id) {
            const points = program.points[result.position] || 0;
            totalPoints += points;
            
            // Add grade points if applicable
            if (result.grade === 'A') totalPoints += 2;
            else if (result.grade === 'B') totalPoints += 1;
          }
        }
      });
      
      return {
        ...team,
        totalPoints
      };
    });
    
    // Sort by points descending
    return standings.sort((a, b) => b.totalPoints - a.totalPoints);
  };

  const teamStandings = calculateTeamStandings();
  
  // Get top performers
  const getTopPerformers = () => {
    // Calculate points for each student
    const studentPoints = students.map(student => {
      const studentResults = results.filter(result => result.studentId === student.id);
      let totalPoints = 0;
      
      studentResults.forEach(result => {
        const program = programs.find(p => p.id === result.programId);
        if (program) {
          totalPoints += program.points[result.position] || 0;
          
          // Add grade points if applicable
          if (result.grade === 'A') totalPoints += 2;
          else if (result.grade === 'B') totalPoints += 1;
        }
      });
      
      return {
        ...student,
        totalPoints
      };
    });
    
    // Sort by points descending and take top 10
    return studentPoints
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, 10);
  };
  
  const topPerformers = getTopPerformers();
  
  // Filter and search results
  const filteredResults = results.filter(result => {
    // Search filter
    if (searchTerm) {
      const program = programs.find(p => p.id === result.programId);
      const student = students.find(s => s.id === result.studentId);
      const team = teams.find(t => t.id === (student?.teamId || result.teamId));
      
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        (program?.name.toLowerCase().includes(searchLower)) ||
        (student?.name.toLowerCase().includes(searchLower)) ||
        (team?.name.toLowerCase().includes(searchLower));
      
      if (!matchesSearch) return false;
    }
    
    // Team filter
    if (filters.teamId) {
      const student = students.find(s => s.id === result.studentId);
      const teamId = student?.teamId || result.teamId;
      if (teamId !== filters.teamId) return false;
    }
    
    // Category filter
    if (filters.category) {
      const student = students.find(s => s.id === result.studentId);
      if (student?.category !== filters.category) return false;
    }
    
    return true;
  });

  return (
    <>
      <Header style={{ background: currentActiveEvent ? `linear-gradient(135deg, ${currentActiveEvent.themeColor}, ${adjustColor(currentActiveEvent.themeColor, 30)})` : '' }}>
        <Title>{currentActiveEvent ? currentActiveEvent.name : 'Arts Festival Results'}</Title>
        <EventSwitcher 
          currentEvent={currentActiveEvent}
          totalEvents={activeEvents.length}
          currentIndex={activeEventIndex}
          onSwitch={handleNextEvent}
          themeColor={currentActiveEvent?.themeColor}
        />
      </Header>
      
      <SearchAndFilter 
        onSearch={setSearchTerm}
        onFilter={setFilters}
        teams={teams}
        categories={categories}
        currentFilters={filters}
      />
      
      {topPerformers.length > 0 && (
        <TopPerformers 
          topPerformers={topPerformers} 
          teams={teams} 
          programs={programs} 
          results={results} 
        />
      )}
      
      <TeamStandings standings={teamStandings} />
      
      <ResultsDisplay 
        results={filteredResults} 
        programs={programs} 
        students={students} 
        teams={teams} 
      />
    </>
  );
};

// Helper function to adjust color brightness
function adjustColor(color, amount) {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

// Helper function to get color for result positions
function getResultColor(position) {
  switch (position) {
    case '1st': return '#f1c40f'; // Gold
    case '2nd': return '#95a5a6'; // Silver
    case '3rd': return '#cd7f32'; // Bronze
    default: return '#3498db'; // Blue
  }
}

// Admin Login Component
const AdminLogin = () => {
  const { setIsAdminAuthenticated } = useAppState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsAdminAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '50px auto', 
      background: 'white', 
      padding: '30px', 
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#6e45e2' }}>Admin Login</h2>
      {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</div>}
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '16px'
            }}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '16px'
            }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            background: '#6e45e2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = () => {
  const { setIsAdminAuthenticated, events, teams, students, programs, results } = useAppState();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
  };

  return (
    <div>
      <AdminHeader onLogout={handleLogout} />
      
      <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div style={{ 
        background: 'white', 
        borderRadius: '10px', 
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div>
          {activeTab === 'dashboard' && (
            <DashboardOverview 
              eventCount={events.length}
              teamCount={teams.length}
              studentCount={students.length}
              programCount={programs.length}
              resultCount={results.length}
              activeEvents={events.filter(e => e.isActive).length}
            />
          )}
          {activeTab === 'events' && <EventsManagement />}
          {activeTab === 'teams' && <TeamsManagement />}
          {activeTab === 'students' && <StudentsManagement />}
          {activeTab === 'programs' && <ProgramsManagement />}
          {activeTab === 'results' && <ResultsManagement />}
          {activeTab === 'points' && <PointsConfiguration />}
        </div>
      </div>
    </div>
  );
};

// Events Management Component
const EventsManagement = () => {
  const { events, setEvents } = useAppState();
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    themeColor: '#6e45e2',
    logo: ''
  });

  const activeEventsCount = events.filter(e => e.isActive).length;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingEvent) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === editingEvent.id 
          ? { ...event, ...formData }
          : event
      ));
      setEditingEvent(null);
    } else {
      // Add new event
      const newEvent = {
        id: Date.now().toString(),
        ...formData,
        isActive: false
      };
      setEvents([...events, newEvent]);
    }
    
    setFormData({ name: '', themeColor: '#6e45e2', logo: '' });
    setShowForm(false);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      name: event.name,
      themeColor: event.themeColor || '#6e45e2',
      logo: event.logo || ''
    });
    setShowForm(true);
  };

  const handleDelete = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const toggleActive = (eventId) => {
    const event = events.find(e => e.id === eventId);
    if (!event.isActive && activeEventsCount >= 4) {
      alert('Maximum of 4 events can be active at once');
      return;
    }
    
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, isActive: !event.isActive }
        : event
    ));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Event Management</h2>
        <div>
          Active Events: {activeEventsCount}/4
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingEvent(null);
              setFormData({ name: '', themeColor: '#6e45e2', logo: '' });
            }}
            style={{
              marginLeft: '15px',
              padding: '8px 15px',
              background: '#6e45e2',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {showForm ? 'Cancel' : 'Add Event'}
          </button>
        </div>
      </div>
      
      {showForm && (
        <form onSubmit={handleSubmit} style={{ 
          background: '#f9f9f9', 
          padding: '20px', 
          borderRadius: '5px', 
          marginBottom: '20px' 
        }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Event Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
              required
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Theme Color</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="color"
                value={formData.themeColor}
                onChange={(e) => setFormData({...formData, themeColor: e.target.value})}
                style={{
                  width: '50px',
                  height: '40px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              />
              <span style={{ marginLeft: '10px' }}>{formData.themeColor}</span>
            </div>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Logo URL (optional)</label>
            <input
              type="text"
              value={formData.logo}
              onChange={(e) => setFormData({...formData, logo: e.target.value})}
              placeholder="https://example.com/logo.png"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
            />
          </div>
          
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              background: '#6e45e2',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {editingEvent ? 'Update Event' : 'Create Event'}
          </button>
        </form>
      )}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {events.map(event => (
          <div key={event.id} style={{ 
            border: '1px solid #eee', 
            borderRadius: '8px', 
            padding: '15px',
            position: 'relative'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              marginBottom: '10px'
            }}>
              <h3 style={{ margin: 0 }}>{event.name}</h3>
              {event.logo && <span style={{ fontSize: '24px' }}>🎭</span>}
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '15px' 
            }}>
              <div style={{ 
                width: '20px', 
                height: '20px', 
                backgroundColor: event.themeColor, 
                borderRadius: '50%', 
                marginRight: '10px' 
              }}></div>
              <span>{event.themeColor}</span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              {event.isActive ? (
                <span style={{ 
                  background: '#2ecc71', 
                  color: 'white', 
                  padding: '3px 10px', 
                  borderRadius: '15px',
                  fontSize: '12px'
                }}>
                  Active
                </span>
              ) : (
                <span style={{ 
                  background: '#95a5a6', 
                  color: 'white', 
                  padding: '3px 10px', 
                  borderRadius: '15px',
                  fontSize: '12px'
                }}>
                  Inactive
                </span>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => toggleActive(event.id)}
                style={{
                  padding: '5px 10px',
                  background: event.isActive ? '#e74c3c' : '#2ecc71',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                {event.isActive ? 'Deactivate' : 'Activate'}
              </button>
              
              <button
                onClick={() => handleEdit(event)}
                style={{
                  padding: '5px 10px',
                  background: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Edit
              </button>
              
              <button
                onClick={() => handleDelete(event.id)}
                style={{
                  padding: '5px 10px',
                  background: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Teams Management Component
const TeamsManagement = () => {
  const { teams, setTeams } = useAppState();
  const [showForm, setShowForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    color: '#3498db'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingTeam) {
      // Update existing team
      setTeams(teams.map(team => 
        team.id === editingTeam.id 
          ? { ...team, ...formData }
          : team
      ));
      setEditingTeam(null);
    } else {
      // Add new team
      const newTeam = {
        id: Date.now().toString(),
        ...formData
      };
      setTeams([...teams, newTeam]);
    }
    
    setFormData({ name: '', color: '#3498db' });
    setShowForm(false);
  };

  const handleEdit = (team) => {
    setEditingTeam(team);
    setFormData({
      name: team.name,
      color: team.color
    });
    setShowForm(true);
  };

  const handleDelete = (teamId) => {
    setTeams(teams.filter(team => team.id !== teamId));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Team Management</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingTeam(null);
            setFormData({ name: '', color: '#3498db' });
          }}
          style={{
            padding: '8px 15px',
            background: '#6e45e2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {showForm ? 'Cancel' : 'Add Team'}
        </button>
      </div>
      
      {showForm && (
        <form onSubmit={handleSubmit} style={{ 
          background: '#f9f9f9', 
          padding: '20px', 
          borderRadius: '5px', 
          marginBottom: '20px' 
        }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Team Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
              required
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Team Color</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({...formData, color: e.target.value})}
                style={{
                  width: '50px',
                  height: '40px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              />
              <span style={{ marginLeft: '10px' }}>{formData.color}</span>
            </div>
          </div>
          
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              background: '#6e45e2',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {editingTeam ? 'Update Team' : 'Create Team'}
          </button>
        </form>
      )}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {teams.map(team => (
          <div key={team.id} style={{ 
            border: '1px solid #eee', 
            borderRadius: '8px', 
            padding: '15px',
            borderLeft: `5px solid ${team.color}`
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              <h3 style={{ margin: 0 }}>{team.name}</h3>
              <div style={{ 
                width: '20px', 
                height: '20px', 
                backgroundColor: team.color, 
                borderRadius: '50%' 
              }}></div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => handleEdit(team)}
                style={{
                  padding: '5px 10px',
                  background: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Edit
              </button>
              
              <button
                onClick={() => handleDelete(team.id)}
                style={{
                  padding: '5px 10px',
                  background: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Students Management Component
const StudentsManagement = () => {
  const { students, setStudents, teams, categories } = useAppState();
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    teamId: '',
    category: categories[0] || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingStudent) {
      // Update existing student
      setStudents(students.map(student => 
        student.id === editingStudent.id 
          ? { ...student, ...formData }
          : student
      ));
      setEditingStudent(null);
    } else {
      // Add new student
      const newStudent = {
        id: Date.now().toString(),
        ...formData
      };
      setStudents([...students, newStudent]);
    }
    
    setFormData({ name: '', teamId: '', category: categories[0] || '' });
    setShowForm(false);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      teamId: student.teamId,
      category: student.category
    });
    setShowForm(true);
  };

  const handleDelete = (studentId) => {
    setStudents(students.filter(student => student.id !== studentId));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Student Management</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingStudent(null);
            setFormData({ name: '', teamId: '', category: categories[0] || '' });
          }}
          style={{
            padding: '8px 15px',
            background: '#6e45e2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {showForm ? 'Cancel' : 'Add Student'}
        </button>
      </div>
      
      {showForm && (
        <form onSubmit={handleSubmit} style={{ 
          background: '#f9f9f9', 
          padding: '20px', 
          borderRadius: '5px', 
          marginBottom: '20px' 
        }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Student Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
              required
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Team</label>
            <select
              value={formData.teamId}
              onChange={(e) => setFormData({...formData, teamId: e.target.value})}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
              required
            >
              <option value="">Select a team</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
              required
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              background: '#6e45e2',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {editingStudent ? 'Update Student' : 'Create Student'}
          </button>
        </form>
      )}
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9f9f9' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Team</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Category</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => {
              const team = teams.find(t => t.id === student.teamId);
              return (
                <tr key={student.id}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{student.name}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                    {team && (
                      <span style={{ 
                        padding: '3px 8px', 
                        borderRadius: '3px',
                        background: team.color,
                        color: 'white',
                        fontSize: '12px'
                      }}>
                        {team.name}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{student.category}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                    <button
                      onClick={() => handleEdit(student)}
                      style={{
                        padding: '5px 10px',
                        background: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        marginRight: '5px'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      style={{
                        padding: '5px 10px',
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Programs Management Component
const ProgramsManagement = () => {
  const { programs, setPrograms } = useAppState();
  const [showForm, setShowForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'individual',
    points: { '1st': 10, '2nd': 7, '3rd': 5 }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProgram) {
      // Update existing program
      setPrograms(programs.map(program => 
        program.id === editingProgram.id 
          ? { ...program, ...formData }
          : program
      ));
      setEditingProgram(null);
    } else {
      // Add new program
      const newProgram = {
        id: Date.now().toString(),
        ...formData
      };
      setPrograms([...programs, newProgram]);
    }
    
    setFormData({
      name: '',
      type: 'individual',
      points: { '1st': 10, '2nd': 7, '3rd': 5 }
    });
    setShowForm(false);
  };

  const handleEdit = (program) => {
    setEditingProgram(program);
    setFormData({
      name: program.name,
      type: program.type,
      points: { ...program.points }
    });
    setShowForm(true);
  };

  const handleDelete = (programId) => {
    setPrograms(programs.filter(program => program.id !== programId));
  };

  const handlePointChange = (position, value) => {
    setFormData({
      ...formData,
      points: {
        ...formData.points,
        [position]: parseInt(value) || 0
      }
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Program Management</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingProgram(null);
            setFormData({
              name: '',
              type: 'individual',
              points: { '1st': 10, '2nd': 7, '3rd': 5 }
            });
          }}
          style={{
            padding: '8px 15px',
            background: '#6e45e2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {showForm ? 'Cancel' : 'Add Program'}
        </button>
      </div>
      
      {showForm && (
        <form onSubmit={handleSubmit} style={{ 
          background: '#f9f9f9', 
          padding: '20px', 
          borderRadius: '5px', 
          marginBottom: '20px' 
        }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Program Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
              required
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Program Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
            >
              <option value="individual">Individual</option>
              <option value="group">Group</option>
              <option value="general">General</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Points Configuration</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <div>
                <label>1st Place</label>
                <input
                  type="number"
                  value={formData.points['1st']}
                  onChange={(e) => handlePointChange('1st', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                />
              </div>
              <div>
                <label>2nd Place</label>
                <input
                  type="number"
                  value={formData.points['2nd']}
                  onChange={(e) => handlePointChange('2nd', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                />
              </div>
              <div>
                <label>3rd Place</label>
                <input
                  type="number"
                  value={formData.points['3rd']}
                  onChange={(e) => handlePointChange('3rd', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                />
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              background: '#6e45e2',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {editingProgram ? 'Update Program' : 'Create Program'}
          </button>
        </form>
      )}
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9f9f9' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Program Name</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Type</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #eee' }}>1st Place</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #eee' }}>2nd Place</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #eee' }}>3rd Place</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {programs.map(program => (
              <tr key={program.id}>
                <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{program.name}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                  <span style={{ 
                    padding: '3px 8px', 
                    borderRadius: '3px',
                    background: program.type === 'individual' ? '#3498db' : program.type === 'group' ? '#e74c3c' : '#9b59b6',
                    color: 'white',
                    fontSize: '12px'
                  }}>
                    {program.type}
                  </span>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{program.points['1st'] || 0}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{program.points['2nd'] || 0}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{program.points['3rd'] || 0}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                  <button
                    onClick={() => handleEdit(program)}
                    style={{
                      padding: '5px 10px',
                      background: '#3498db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      marginRight: '5px'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(program.id)}
                    style={{
                      padding: '5px 10px',
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Results Management Component
const ResultsManagement = () => {
  const { results, setResults, programs, students, teams } = useAppState();
  const [showForm, setShowForm] = useState(false);
  const [editingResult, setEditingResult] = useState(null);
  const [formData, setFormData] = useState({
    programId: '',
    studentId: '',
    teamId: '',
    position: '1st',
    grade: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingResult) {
      // Update existing result
      setResults(results.map(result => 
        result.id === editingResult.id 
          ? { ...result, ...formData }
          : result
      ));
      setEditingResult(null);
    } else {
      // Add new result
      const newResult = {
        id: Date.now().toString(),
        ...formData
      };
      setResults([...results, newResult]);
    }
    
    setFormData({
      programId: '',
      studentId: '',
      teamId: '',
      position: '1st',
      grade: ''
    });
    setShowForm(false);
  };

  const handleEdit = (result) => {
    setEditingResult(result);
    setFormData({
      programId: result.programId,
      studentId: result.studentId || '',
      teamId: result.teamId || '',
      position: result.position,
      grade: result.grade || ''
    });
    setShowForm(true);
  };

  const handleDelete = (resultId) => {
    setResults(results.filter(result => result.id !== resultId));
  };

  // Filter students based on selected program type
  const filteredStudents = formData.programId 
    ? students.filter(student => {
        const program = programs.find(p => p.id === formData.programId);
        return !program || program.type === 'individual';
      })
    : students;

  // Filter teams based on selected program type
  const filteredTeams = formData.programId 
    ? teams.filter(team => {
        const program = programs.find(p => p.id === formData.programId);
        return !program || program.type === 'group';
      })
    : teams;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Results Management</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingResult(null);
            setFormData({
              programId: '',
              studentId: '',
              teamId: '',
              position: '1st',
              grade: ''
            });
          }}
          style={{
            padding: '8px 15px',
            background: '#6e45e2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {showForm ? 'Cancel' : 'Add Result'}
        </button>
      </div>
      
      {showForm && (
        <form onSubmit={handleSubmit} style={{ 
          background: '#f9f9f9', 
          padding: '20px', 
          borderRadius: '5px', 
          marginBottom: '20px' 
        }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Program</label>
            <select
              value={formData.programId}
              onChange={(e) => {
                const program = programs.find(p => p.id === e.target.value);
                setFormData({
                  ...formData,
                  programId: e.target.value,
                  studentId: program?.type === 'individual' ? formData.studentId : '',
                  teamId: program?.type === 'group' ? formData.teamId : ''
                });
              }}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
              required
            >
              <option value="">Select a program</option>
              {programs.map(program => (
                <option key={program.id} value={program.id}>{program.name} ({program.type})</option>
              ))}
            </select>
          </div>
          
          {(() => {
            const program = programs.find(p => p.id === formData.programId);
            if (program?.type === 'individual') {
              return (
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Student</label>
                  <select
                    value={formData.studentId}
                    onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px'
                    }}
                    required
                  >
                    <option value="">Select a student</option>
                    {filteredStudents.map(student => {
                      const team = teams.find(t => t.id === student.teamId);
                      return (
                        <option key={student.id} value={student.id}>
                          {student.name} ({team?.name})
                        </option>
                      );
                    })}
                  </select>
                </div>
              );
            } else if (program?.type === 'group') {
              return (
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Team</label>
                  <select
                    value={formData.teamId}
                    onChange={(e) => setFormData({...formData, teamId: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px'
                    }}
                    required
                  >
                    <option value="">Select a team</option>
                    {filteredTeams.map(team => (
                      <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                  </select>
                </div>
              );
            }
            return null;
          })()}
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Position</label>
            <select
              value={formData.position}
              onChange={(e) => setFormData({...formData, position: e.target.value})}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
            >
              <option value="1st">1st Place</option>
              <option value="2nd">2nd Place</option>
              <option value="3rd">3rd Place</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Grade (Optional)</label>
            <select
              value={formData.grade}
              onChange={(e) => setFormData({...formData, grade: e.target.value})}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
            >
              <option value="">No Grade</option>
              <option value="A">A Grade</option>
              <option value="B">B Grade</option>
            </select>
          </div>
          
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              background: '#6e45e2',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {editingResult ? 'Update Result' : 'Add Result'}
          </button>
        </form>
      )}
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9f9f9' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Program</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Participant</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Position</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Grade</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map(result => {
              const program = programs.find(p => p.id === result.programId);
              const student = students.find(s => s.id === result.studentId);
              const team = teams.find(t => t.id === (student?.teamId || result.teamId));
              
              return (
                <tr key={result.id}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{program?.name}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                    {student ? `${student.name} (${team?.name})` : team?.name}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                    <span style={{ 
                      background: getResultColor(result.position), 
                      color: 'white', 
                      padding: '3px 8px', 
                      borderRadius: '15px',
                      fontSize: '12px'
                    }}>
                      {result.position}
                    </span>
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                    {result.grade && (
                      <span style={{ 
                        background: result.grade === 'A' ? '#2ecc71' : '#3498db', 
                        color: 'white', 
                        padding: '3px 8px', 
                        borderRadius: '15px',
                        fontSize: '12px'
                      }}>
                        {result.grade}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                    <button
                      onClick={() => handleEdit(result)}
                      style={{
                        padding: '5px 10px',
                        background: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        marginRight: '5px'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(result.id)}
                      style={{
                        padding: '5px 10px',
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Points Configuration Component
const PointsConfiguration = () => {
  const { categories } = useAppState();
  
  return (
    <div>
      <h2>Points Configuration</h2>
      <p>Configure point values for different program types and categories.</p>
      
      <div style={{ 
        background: '#f9f9f9', 
        padding: '20px', 
        borderRadius: '5px',
        marginTop: '20px'
      }}>
        <h3>Program Type Points</h3>
        <p>Different point values can be assigned to individual, group, and general programs.</p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px',
          marginTop: '20px'
        }}>
          <div style={{ 
            background: 'white', 
            padding: '15px', 
            borderRadius: '8px',
            border: '1px solid #eee'
          }}>
            <h4>Individual Programs</h4>
            <ul>
              <li>1st Place: 10 points</li>
              <li>2nd Place: 7 points</li>
              <li>3rd Place: 5 points</li>
              <li>A Grade Bonus: +2 points</li>
              <li>B Grade Bonus: +1 point</li>
            </ul>
          </div>
          
          <div style={{ 
            background: 'white', 
            padding: '15px', 
            borderRadius: '8px',
            border: '1px solid #eee'
          }}>
            <h4>Group Programs</h4>
            <ul>
              <li>1st Place: 15 points</li>
              <li>2nd Place: 10 points</li>
              <li>3rd Place: 7 points</li>
              <li>A Grade Bonus: +2 points</li>
              <li>B Grade Bonus: +1 point</li>
            </ul>
          </div>
          
          <div style={{ 
            background: 'white', 
            padding: '15px', 
            borderRadius: '8px',
            border: '1px solid #eee'
          }}>
            <h4>General Programs</h4>
            <ul>
              <li>1st Place: 8 points</li>
              <li>2nd Place: 5 points</li>
              <li>3rd Place: 3 points</li>
              <li>A Grade Bonus: +2 points</li>
              <li>B Grade Bonus: +1 point</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div style={{ 
        background: '#f9f9f9', 
        padding: '20px', 
        borderRadius: '5px',
        marginTop: '20px'
      }}>
        <h3>Category Configuration</h3>
        <p>Currently supporting the following categories:</p>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
        <p>To add or remove categories, modify the categories array in the app state.</p>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const { currentView, setCurrentView, isAdminAuthenticated } = useAppState();
  const [showLanding, setShowLanding] = useState(true);
  
  const handleStart = (view) => {
    setShowLanding(false);
    setCurrentView(view);
  };
  
  if (showLanding) {
    return <LandingPage onStart={handleStart} />;
  }
  
  return (
    <AppStateProvider>
      <GlobalStyle />
      <AppContainer>
        {!isAdminAuthenticated ? (
          <>
            <ViewToggle>
              <ViewButton 
                active={currentView === 'public'} 
                onClick={() => setCurrentView('public')}
              >
                Public View
              </ViewButton>
              <ViewButton 
                active={currentView === 'admin'} 
                onClick={() => setCurrentView('admin')}
              >
                Admin Panel
              </ViewButton>
            </ViewToggle>
            
            <MainContent>
              {currentView === 'public' ? <PublicView /> : <AdminLogin />}
            </MainContent>
          </>
        ) : (
          <AdminDashboard />
        )}
      </AppContainer>
    </AppStateProvider>
  );
};

export default App;