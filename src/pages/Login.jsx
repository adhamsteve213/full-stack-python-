import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import '../style.css/login.css';

export default function Login() {
  const [username, setUsername] = useState('');
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
  const resp = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await resp.json();
      if (!resp.ok) {
        const msg = data.non_field_errors ? data.non_field_errors[0] : data.detail || 'Login failed';
        throw new Error(msg);
      }

      const token = data.token || data.key || data.access;
      if (!token) throw new Error('No token returned from server');

      // try to fetch profile (role, user info)
      let role = null;
      let user = { username };
      try {
  const profileRes = await fetch('http://127.0.0.1:8000/api/profiles/', {
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
        // ignore profile fetch errors
      }

      login({ token, role, user });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-card">
          <h3 className="login-title">Login</h3>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="login-button"
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>
          {error && <p className="login-error">{error}</p>}
        </div>
      </div>
    </div>
  );
}