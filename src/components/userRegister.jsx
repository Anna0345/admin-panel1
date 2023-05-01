
import React from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';


const RegistrationButton = styled(Button)({
  marginTop: '30px',
  borderRadius: '25px',
  backgroundColor: '#535353',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#6b6b6b',
  },
});

const UserRegistration = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email, password: values.password, role: values.role }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/login');
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      throw new Error('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
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
      <Typography variant="h4" sx={{ mb: 2 }}>
         Registration
      </Typography>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '', role: 'user' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Email is required'),
          password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
              'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one symbol'
            ),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
          role: Yup.string().oneOf(['user', 'admin'], 'Invalid Role'),
        })}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange }) => (
          <Form style={{ display: 'flex', flexDirection: 'column', minWidth: 300 }}>
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />
            <Select
              label="Role"
              variant="outlined"
              name="role"
              value={values.role}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
              error={touched.role && Boolean(errors.role)}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
            {errors.role && <div style={{ color: 'red', marginBottom: 10 }}>{errors.role}</div>}
            <RegistrationButton type="submit" variant="contained" sx={{ mt: 3 }}>
              Register
            </RegistrationButton>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default UserRegistration;

      




           




     
