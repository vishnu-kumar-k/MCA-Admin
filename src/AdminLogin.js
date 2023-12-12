import React, { useState } from 'react';
import axios from './Axios';

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/admin/login', credentials);

      if (response.status === 200) {
        console.log('Admin logged in successfully');
        onLogin(response.data.name);
      } else {
        console.error('Login failed');
        // Handle login failure, show an error message, or redirect
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle network error or other issues
    }
  };
  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
