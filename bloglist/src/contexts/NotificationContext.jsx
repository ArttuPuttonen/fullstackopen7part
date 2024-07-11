import React, { createContext, useReducer, useContext } from 'react';

// Define the initial state
const initialState = {
  message: null,
  type: null,
};

// Define the reducer function
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.payload.message,
        type: action.payload.type,
      };
    case 'CLEAR_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};

// Create context
const NotificationContext = createContext();

// Create provider component
export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};