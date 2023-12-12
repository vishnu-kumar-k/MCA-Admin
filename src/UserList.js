import React, { useState, useEffect } from 'react';
import axios from './Axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const[count,setCount]=useState(0);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/admin/getusers');

        if (response.status === 200) {
          setUsers(response.data);
        } else {
          console.error('Failed to fetch users');
          // Handle error, show an error message, or redirect
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle network error or other issues
      }
    };

    // Fetch users when the component mounts
    fetchUsers();
  }, [count]);

  const handleDelete = async (userId) => {
    try {
      const response = await axios.post(`/admin/deleteuser`,{userId});

      if (response.status === 200) {
        console.log('User deleted successfully');
        setCount(prev=>prev+1);
        // After deleting a user, refresh the user list
        //fetchUsers();
      } else {
        console.error('Failed to delete user');
        // Handle error, show an error message, or redirect
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle network error or other issues
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Phone</th>
            <th>User Types</th>
            <th>Bio</th>
            <th>Followers</th>
            <th>Following</th>
            <th>Posts</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.DOB || 'N/A'}</td>
              <td>{user.phone || 'N/A'}</td>
              <td>{user.userTypes}</td>
              <td>{user.bio}</td>
              <td>{user.followers.length || 'None'}</td>
              <td>{user.following.length || 'None'}</td>
              <td>{user.posts.length || 'None'}</td>
              <td>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
