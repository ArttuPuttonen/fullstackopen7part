import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs';
import { useNotification } from '../contexts/NotificationContext';

const AddBlogForm = ({ setAddBlogVisible }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const queryClient = useQueryClient();
  const { dispatch } = useNotification();

  const mutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      dispatch({ type: 'SET_NOTIFICATION', payload: { message: `A new blog "${newBlog.title}" by ${newBlog.author} added`, type: 'success' } });
      setAddBlogVisible(false);
    },
    onError: (error) => {
      dispatch({ type: 'SET_NOTIFICATION', payload: { message: error.message, type: 'error' } });
    },
  });

  const handleCreateBlog = (event) => {
    event.preventDefault();
    mutation.mutate({ title, author, url });
  };

  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        title
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AddBlogForm;