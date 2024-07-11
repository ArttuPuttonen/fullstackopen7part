import React, { createContext, useReducer, useContext, useEffect } from 'react';

const UserContext = createContext();

const initialState = {
  user: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { user: action.payload };
    case 'CLEAR_USER':
      return { user: null };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch({ type: 'SET_USER', payload: user });
    }
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};