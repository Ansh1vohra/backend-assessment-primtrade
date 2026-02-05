import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Task Manager</h1>
        <p>A secure and scalable task management system with role-based access control</p>
        <div className="home-actions">
          <Link to="/login" className="btn-home btn-primary-home">
            Login
          </Link>
          <Link to="/register" className="btn-home btn-secondary-home">
            Register
          </Link>
        </div>
        <div className="features">
          <div className="feature">
            <h3>🔐 Secure Authentication</h3>
            <p>JWT-based authentication with password encryption</p>
          </div>
          <div className="feature">
            <h3>👥 Role-Based Access</h3>
            <p>User and Admin roles with different permissions</p>
          </div>
          <div className="feature">
            <h3>✅ Task Management</h3>
            <p>Create, read, update, and delete your tasks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
