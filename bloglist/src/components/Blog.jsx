import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, Button } from 'react-bootstrap';
import blogService from '../services/blogs';
import { useNotification } from '../contexts/NotificationContext';

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const queryClient = useQueryClient();
  const { dispatch } = useNotification();

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const likeMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blogs'], (oldBlogs) =>
        oldBlogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
      );
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { message: `Liked blog "${updatedBlog.title}"`, type: 'success' },
      });
    },
    onError: (error) => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { message: 'Failed to update blog', type: 'error' },
      });
    },
  });

  const handleLike = () => {
    const userId = blog.user ? blog.user.id : null;
    const updatedBlog = {
      ...blog,
      votes: blog.votes + 1,
      user: blog.user,
    };

    const blogToSend = {
      ...updatedBlog,
      user: userId,
    };

    likeMutation.mutate(blogToSend);
  };

  const removeMutation = useMutation({
    mutationFn: blogService.removeBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { message: `Removed blog "${blog.title}" by ${blog.author}`, type: 'success' },
      });
    },
    onError: (error) => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { message: 'Failed to remove blog', type: 'error' },
      });
    },
  });

  const handleRemove = () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      removeMutation.mutate(blog.id);
    }
  };

  const removeButton = () => <Button variant="danger" onClick={handleRemove}>Remove</Button>;

  const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'));

  return (
    <Card style={{ marginBottom: '10px' }}>
      <Card.Body>
        <Card.Title>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
          <Button variant="link" onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</Button>
        </Card.Title>
        {visible && (
          <>
            <Card.Text>
              URL: {blog.url}
            </Card.Text>
            <Card.Text>
              Likes: {blog.votes} <Button onClick={handleLike}>Like</Button>
            </Card.Text>
            {blog.user && <Card.Text>User: {blog.user.name}</Card.Text>}
            {blog.user && loggedUser.username === blog.user.username && removeButton()}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default Blog;