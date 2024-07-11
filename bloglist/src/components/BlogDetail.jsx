import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${id}`); // Ensure this endpoint is correct
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>URL: {blog.url}</p>
      <p>Likes: {blog.votes}</p>
      <p>Added by: {blog.user ? blog.user.name : 'Unknown'}</p>
      <h3>Comments</h3>
      <ul>
        {blog.comments ? blog.comments.map(comment => (
          <li key={comment.id}>{comment.text}</li>
        )) : 'No comments'}
      </ul>
    </div>
  );
};

export default BlogDetail;
