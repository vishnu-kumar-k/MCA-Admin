import React, { useState, useEffect } from 'react';
import axios from './Axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/blog/all');

      if (response.status === 200) {
        setBlogs(response.data.feeds);
      } else {
        console.error('Failed to fetch blogs');
        // Handle error, show an error message, or redirect
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      // Handle network error or other issues
    }
  };

  useEffect(() => {
    
    // Fetch blogs when the component mounts
    fetchBlogs();
  }, []);

  const handleDelete = async (postId) => {
    try {
      const response = await axios.post(`/blog/delete`,{postId});

      if (response.status === 200) {
        console.log('Blog post deleted successfully');
        // After deleting a post, refresh the blog list
        fetchBlogs();
      } else {
        console.error('Failed to delete blog post');
        // Handle error, show an error message, or redirect
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
      // Handle network error or other issues
    }
  };

  return (
    <div>
      <h2>Blog List</h2>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <h3>{blog.title}</h3>
          <img src={blog.headerImageUrl} alt="Blog Header" style={{ maxWidth: '100%' }} />
          <p>{blog.description}</p>
          <p>Author: {blog.author}</p>
          <p>Date: {new Date(blog.date).toLocaleString()}</p>
          {/* Add more details as needed */}
          <button onClick={() => handleDelete(blog._id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default BlogList;
