import React, { useState } from 'react';
import { Card } from '../../components/Card/Card';
import './Login.css';

interface LoginProps {
  onLogin?: (role: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication for chairperson
    if (accountName === 'chairperson' && password === '123456') {
      setError('');
      if (onLogin) {
        onLogin('chairperson'); // Trigger authentication state change
      }
    } else if (accountName === 'voter' && password === '123456') {
      setError('');
      if (onLogin) {
        onLogin('voter'); // Trigger standard user login
      }
    } else {
      setError('Invalid account name or password');
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <h2 className="login-title">BlockVote Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="accountName">Account Name</label>
            <input
              type="text"
              id="accountName"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Enter your account name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </Card>
    </div>
  );
};