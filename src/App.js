import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AddAdmin from './AddAdmin';
import UserList from './UserList';
import BlogList from './BlogList';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (name) => {
    setIsAuthenticated(true);
    // Optionally, you can store user information in state
    // setName(name);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/admin/addadmin">Add Admin</Link>
                </li>
                <li>
                  <Link to="/admin/userlist">User List</Link>
                </li>
                <li>
                  <Link to="/admin/bloglist">Blog List</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route
            path="/admin/login"
            element={<AdminLogin onLogin={handleLogin} />}
          />
          {isAuthenticated ? (
            <>
              <Route path="/admin/addadmin" element={<AddAdmin />} />
              <Route path="/admin/userlist" element={<UserList />} />
              <Route path="/admin/bloglist" element={<BlogList />} />
              {/* Add more routes as needed */}
            </>
          ) : (
            <Route
              path="/*"
              element={<Navigate to="/admin/login" />}
            />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
