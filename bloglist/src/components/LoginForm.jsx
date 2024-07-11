import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Notification from './Notifications';
import { useUser } from '../contexts/UserContext';
import loginService from '../services/login';

const LoginForm = ({ errorMessage }) => {
  const { dispatch: userDispatch } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      userDispatch({ type: 'SET_USER', payload: user });
      setUsername('');
      setPassword('');
    } catch (exception) {
      userDispatch({
        type: 'SET_NOTIFICATION',
        payload: { message: 'Wrong username or password', type: 'error' },
      });
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <h2>Log in to blogs application</h2>
        <Notification message={errorMessage} type="error" />
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  errorMessage: PropTypes.string,
};

export default LoginForm;