


import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as  Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import UserLogin from './components/UserLogin';
import UserProducts from './AdminAndUserContainer/UserProducts';
import Orders from './components/Orders';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header';
import jwt_decode from 'jwt-decode';
import UserRegister from './components/userRegister'

const AdminProducts = lazy(() => import('./AdminAndUserContainer/AdminProducts'));
const ProductEdit = lazy(() => import('./services/ProductEdit'));
const ProductCreate = lazy(() => import('./services/ProductCreate'));

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    console.log(token);
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        console.log(decodedToken);
        setIsAdmin(isAdmin || decodedToken.admin);
        setIsLoggedIn(isLoggedIn);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    setIsLoading(false);
  }, []);
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleLogin = (role) => {
    setIsAdmin(role === 'admin');
    setIsLoggedIn(true);
    console.log('isAdmin:', role === 'admin');
    console.log('isLoggedIn:', true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAdmin(false);
    setIsLoggedIn(false);
      navigate('/login');

  };

  return (
    <>
      {isLoggedIn && <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />}
      <Box sx={{ display: 'flex' }}>
        {isLoggedIn && <Sidebar isAdmin={isAdmin} onLogout={handleLogout} />}
        <Box sx={{ flexGrow: 1 }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              {isAdmin ? (
                <>
                  <Route path="/admin/products" element={<AdminProducts />} />
                  <Route path="/edit/:id" element={<ProductEdit />} />

                  <Route path="/create" element={<ProductCreate />} />
                </>
              ) : (
                <Route path="/user/products" element={<UserProducts />} />
              )}
              <Route path="/orders" element={<Orders />} />
              <Route path="/register" element={<UserRegister />} />

              <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
              <Route path="/login" element={<UserLogin onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </Box>
      </Box>
    </>
  );
};

const Home = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 64px)' }}>
      <Typography variant="h3" component={Link} to="/dashboard">
        Welcome to the Dashboard!
      </Typography>
    </Box>
  );
};

const Logout = ({ onLogout }) => {
  useEffect(() => {
    onLogout();
  }, [onLogout]);

};

export default App;

















