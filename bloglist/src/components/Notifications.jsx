import React from 'react';
import { Alert } from 'react-bootstrap';
import { useNotification } from '../contexts/NotificationContext';

const Notification = () => {
  const { state } = useNotification();
  const { message, type } = state;

  if (!message) {
    return null;
  }

  return (
    <Alert variant={type === 'success' ? 'success' : 'danger'}>
      {message}
    </Alert>
  );
};

export default Notification;