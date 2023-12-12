import React, { useState, useEffect } from 'react';
import axios from './Axios';

const AdminList = () => {
  const [adminData, setAdminData] = useState({
    emailId: '',
    name: '',
    password: '',
  });
  const [admins, setAdmins] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({
      ...adminData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/admin/addadmin', adminData);

      if (response.status === 200) {
        console.log('Admin added successfully');
        // You might want to redirect or show a success message
        // After adding an admin, refresh the   admin list
        fetchAdmins();
      } else {
        console.error('Failed to add admin');
        // Handle error, show an error message, or redirect
      }
    } catch (error) {
      console.error('Error adding admin:', error);
      // Handle network error or other issues
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('/admin/getadmin');

      if (response.status === 200) {
        setAdmins(response.data);
      } else {
        console.error('Failed to fetch admins');
        // Handle error, show an error message, or redirect
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
      // Handle network error or other issues
    }
  };

  useEffect(() => {
    // Fetch admins when the component mounts
    fetchAdmins();
  }, []);
  const handleDelete = async (adminId) => {
    try {
      const response = await axios.post(`/admin/deleteadmin`,{adminId});

      if (response.status === 200) {
        console.log('Admin deleted successfully');
        // After deleting an admin, refresh the admin list
        fetchAdmins();
      } else {
        console.error('Failed to delete admin');
        // Handle error, show an error message, or redirect
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
      // Handle network error or other issues
    }
  };
  return (
    <div>
      <h2>Add Admin</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="emailId"
            value={adminData.emailId}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={adminData.name}
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
            value={adminData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Add Admin</button>
      </form>

      <h2>Admin List</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id}>
              <td>{admin.emailId}</td>
              <td>{admin.name}</td>
              <td>
                <button onClick={() => handleDelete(admin._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminList;












