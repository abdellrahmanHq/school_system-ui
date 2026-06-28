import React, { useState, useEffect } from 'react';
import API from './api/axios';
import AuthGate from './AuthGate';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [studentsList, setStudentsList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      API.get('/students')
        .then(res => setStudentsList(res.data))
        .catch(() => handleLogout());
    }
  }, [token]);

  const handleLogin = async (payload) => {
  setLoading(true);
  try {
    const response = await API.post('/auth/login', payload);
    localStorage.setItem('token', response.data.token);
    setToken(response.data.token);
    setError('');
  } catch (err) {
    setError(err.response?.data?.error || 'Login verification failed');
  } finally {
    setLoading(false);
  }
};

  const handleSignup = async (payload) => {
    setLoading(true);
    try {
      const response = await API.post('/students', payload);
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setError('');
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors.join(', '));
      } else {
        setError(err.response?.data?.error || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setStudentsList([]);
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-brand">🏫 EduPulse</div>
        <div className="nav-links">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">News</a>
          <a href="#" className="nav-link">Events</a>
          <a href="#" className="nav-link">Contact Us</a>
          <span className="lang-badge">🌐 English</span>
          {token && <button onClick={handleLogout} className="logout-btn">Log Out</button>}
        </div>
      </nav>

      <header className="hero-header">
        <h1 className="hero-title">School Management System</h1>
        <p className="hero-subtitle">Secure educational infrastructure engine powered by stateless architecture parameters.</p>
      </header>

      <main className="main-content">
        {error && <div className="error-banner">⚠️ {error}</div>}

        {!token ? (
          <AuthGate onLogin={handleLogin} onSignup={handleSignup} loading={loading} />
        ) : (
          <div>
            <section className="dashboard-grid">
              <div className="dash-card">
                <div className="card-icon">👥</div>
                <div>
                  <div className="card-value">{studentsList.length}</div>
                  <div className="card-label">Enrolled Students</div>
                </div>
              </div>
              <div className="dash-card">
                <div className="card-icon">👩‍🏫</div>
                <div>
                  <div className="card-value">42</div>
                  <div className="card-label">Certified Teachers</div>
                </div>
              </div>
              <div className="dash-card">
                <div className="card-icon">📚</div>
                <div>
                  <div className="card-value">18</div>
                  <div className="card-label">Active Courses</div>
                </div>
              </div>
            </section>

            <section className="data-section">
              <h3 className="section-title">Registered Student Roster (Live Database)</h3>
              <div className="table-wrapper">
                <table className="roster-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Full Name</th>
                      <th>Email Address</th>
                      <th>Academic Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsList.map((s, idx) => (
                      <tr key={s.id} className={idx % 2 === 0 ? "row-even" : "row-odd"}>
                        <td>#{s.id}</td>
                        <td style={{ fontWeight: 600, color: '#0f172a' }}>{s.name}</td>
                        <td>{s.email}</td>
                        <td><span className="grade-badge">{s.grade || 'MSc'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="footer-top">
          <div>
            <div className="footer-logo">EduPulse Core Systems</div>
            <p className="footer-text">Stateless framework parsing encryption parameters to deliver secure school metrics analytics.</p>
          </div>
          <div>
            <h4 className="footer-heading">Working Hours</h4>
            <p className="footer-text">Sunday — Thursday<br />08:00 AM — 04:00 PM</p>
          </div>
          <div>
            <h4 className="footer-heading">Contact Portal</h4>
            <p className="footer-text">📍 Amman, Jordan<br />📧 support@edupulse.edu.jo</p>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} EduPulse Platform. Deployed with decoupled Rails + React infrastructure components.
        </div>
      </footer>
    </div>
  );
}

export default App;