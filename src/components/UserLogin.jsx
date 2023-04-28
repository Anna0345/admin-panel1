import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import bcrypt from 'bcryptjs';

import { styled } from '@mui/system';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const StyledInputLabel = styled('label')(({ hasValue }) => ({
  display: 'block',
  color: hasValue ? '#000' : '#6b6b6b',
}));

const StyledButton = styled(Button)({
  backgroundColor: '#000',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#333',
  },
});

const StyledTextField = styled(TextField)({
  marginBottom: '1.5rem',
});

const StyledIcon = styled(AccountCircleIcon)({
  fontSize: '5rem',
  marginBottom: '1rem',
  color: '#000',
});

const UserLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log('Response:', response);
      console.log('Data:', data);
      if (response.ok) {
        localStorage.setItem('token', data.token);
        console.log('Token:', data.token);
        const userResponse = await fetch('http://localhost:3000/users', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });
        const userData = await userResponse.json();
        console.log('User Data Type:', typeof userData);
        console.log('User Data:', userData);
        console.log('User Data Has ID:', userData.hasOwnProperty('id'));
        let foundUser = null;
        for (const user of userData.users) {
          if (user.email === email && bcrypt.compareSync(password, user.password)) {
            foundUser = user;
            break;
          }
        }
        if (foundUser) {
          onLogin(foundUser.role);
          console.log('Role:', foundUser.role);
          navigate(foundUser.role === 'admin' ? '/admin/products' : '/user/products');
        } else {
          setError('Invalid email or password.');
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    }
  };

  console.log('Email:', email);
  console.log('Password:', password);
  console.log('Error:', error);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 64px)',
      }}
    >
      <StyledIcon />
      <Typography variant="h4" sx={{ mb: 3 }}>
        Log in
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column' }}>
        <StyledInputLabel hasValue={Boolean(email)}>Email</StyledInputLabel>
        <StyledTextField type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <StyledInputLabel hasValue={Boolean(password)}>Password</StyledInputLabel>
        <StyledTextField type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <StyledButton type="submit" variant="contained" sx={{ mt: 2 }}>
Login
</StyledButton>
<Typography sx={{ mt: 2 }}>
Don't have an account? <Link to="/register">Register here.</Link>
</Typography>
</Box>
</Box>
);
};

export default UserLogin



      









