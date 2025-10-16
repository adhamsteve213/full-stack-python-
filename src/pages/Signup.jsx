import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import '../style.css/signup.css';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
  const resp = await fetch('http://127.0.0.1:8000/api/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await resp.json();
      if (!resp.ok) {
        // surface useful server validation messages if available
        const msg = data.username?.[0] || data.email?.[0] || data.detail || 'Registration failed';
        throw new Error(msg);
      }

      const token = data.token || data.key || data.access;
      let role = null;
      let user = { username };

      if (token) {
        // create profile for user or fetch profile
        try {
          // attempt to create profile if your API requires it
          await fetch('/profiles/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
            body: JSON.stringify({ username, email }),
          }).catch(() => null);

          const profileRes = await fetch('/profiles/', {
            headers: { Authorization: `Token ${token}` },
          });
          if (profileRes.ok) {
            const profileData = await profileRes.json();
            if (Array.isArray(profileData) && profileData.length > 0) {
              role = profileData[0].role || null;
              user = { ...user, ...profileData[0] };
            }
          }
        } catch (err) {
          // ignore profile errors
        }
      }

      login({ token, role, user });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div className="signup-card">
          <h3 className="signup-title">Sign Up</h3>
          <form onSubmit={handleSubmit} className="signup-form">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="signup-input"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signup-input"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup-input"
              required
            />
            <button type="submit" disabled={loading} className="signup-button">
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>
          {error && <p className="signup-error">{error}</p>}
        </div>
      </div>
    </div>
  );
}