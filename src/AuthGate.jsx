import React, { useState } from 'react';

function AuthGate({ onLogin, onSignup, loading }) {
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', grade: '' });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin(loginForm);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    onSignup(signupForm);
  };

  return (
    <div className="auth-container">
      <div className="auth-info">
        <h2>Welcome to the Campus Portal</h2>
        <p>Access your school profile, review enrolled coursework paths, track certified instruction progress metrics, and view real-time system synchronization parameters.</p>
      </div>

      <div>
        <div className="auth-tabs">
          <button 
            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Sign In
          </button>
          <button 
            className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Register Account
          </button>
        </div>

        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="auth-form">
            <div className="input-group">
              <label>Institutional Email Address</label>
              <input 
                type="email" 
                className="input-field"
                placeholder="name@school.com"
                value={loginForm.email}
                onChange={e => setLoginForm({...loginForm, email: e.target.value})}
                required 
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                className="input-field"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                required 
              />
            </div>
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Verifying...' : 'Sign In Now →'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit} className="auth-form">
            <div className="input-group">
              <label>Full Legal Name</label>
              <input 
                type="text" 
                className="input-field"
                placeholder="Abdellrahman AlHanaqtah"
                value={signupForm.name}
                onChange={e => setSignupForm({...signupForm, name: e.target.value})}
                required 
              />
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                className="input-field"
                placeholder="name@school.com"
                value={signupForm.email}
                onChange={e => setSignupForm({...signupForm, email: e.target.value})}
                required 
              />
            </div>
            <div className="input-group">
              <label>Security Password (min 6 characters)</label>
              <input 
                type="password" 
                className="input-field"
                placeholder="••••••••"
                value={signupForm.password}
                onChange={e => setSignupForm({...signupForm, password: e.target.value})}
                required 
              />
            </div>
            <div className="input-group">
              <label>Academic Grade Level</label>
              <input 
                type="text" 
                className="input-field"
                placeholder="e.g. 12th Grade, MSc"
                value={signupForm.grade}
                onChange={e => setSignupForm({...signupForm, grade: e.target.value})}
                required 
              />
            </div>
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Processing...' : 'Complete Registration'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthGate;