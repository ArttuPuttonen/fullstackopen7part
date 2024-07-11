import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Blog from "./components/Blog";
import Users from "./components/Users";
import User from "./components/User";
import BlogDetail from "./components/BlogDetail";
import blogService from "./services/blogs";
import Notification from "./components/Notifications";
import "./services/index.css";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import { NotificationProvider, useNotification } from './contexts/NotificationContext';
import { UserProvider, useUser } from './contexts/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const queryClient = new QueryClient();

const AppContent = () => {
  const [addBlogVisible, setAddBlogVisible] = useState(false);
  const { state: userState, dispatch: userDispatch } = useUser();
  const { dispatch: notificationDispatch } = useNotification();

  useEffect(() => {
    if (userState.user) {
      blogService.setToken(userState.user.token);
    }
  }, [userState.user]);

  const { data: blogs, error, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  });

  const addBlogForm = () => {
    return (
      <div>
        <Button onClick={() => setAddBlogVisible(true)}>Create New Blog</Button>
        {addBlogVisible && (
          <div>
            <AddBlogForm setAddBlogVisible={setAddBlogVisible} />
            <Button variant="secondary" onClick={() => setAddBlogVisible(false)}>Cancel</Button>
          </div>
        )}
      </div>
    );
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    userDispatch({ type: 'CLEAR_USER' });
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: { message: 'Logout successful', type: 'success' } });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const blogForm = () => (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>{userState.user.name} logged-in</p>
      <Button onClick={handleLogout}>Logout</Button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return (
    <Router>
      <Container>
        <h1>Blogs</h1>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>Blog App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Blogs</Nav.Link>
              <Nav.Link as={Link} to="/users">Users</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route path="/users/:id" element={<User />} />
          <Route path="/users" element={<Users />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/" element={
            <>
              {!userState.user && <LoginForm />}
              {userState.user && addBlogForm()}
              {userState.user && blogForm()}
            </>
          } />
        </Routes>
      </Container>
    </Router>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </NotificationProvider>
  </QueryClientProvider>
);

export default App;