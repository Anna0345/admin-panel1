
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

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
        User Registration
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
        {({ values, errors, touched}) => (
         <Form
         style={{ display: "flex", flexDirection: "column" }}
         onSubmit={(e) => {
           e.preventDefault();
           handleSubmit();
         }}
       >
            <label htmlFor="email">Email</label>
            <Field
             style={{minHeight: 40, minWidth: 250,marginBottom:10}}
             name="email" 
             type="email" 
             value={values.email} />
            { touched.email && errors.email ? <div style={{ color:"red", marginBottom:10 }}>{errors.email}</div> : null}

            <label htmlFor="password">Password</label>
            <Field 
             as="input"
             style={{ minHeight: 40, marginBottom:10 }}
            name="password" 
            type="password" 
            value={values.password}  />
            { touched.password && errors.password ? <div  style={{ color:"red", marginBottom:10 }}>{errors.password}</div> : null}

            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field 
            as="input"
            style={{ minHeight: 40,  marginBottom:10 }}
            name="confirmPassword" 
            type="password" 
            value={values.confirmPassword}  />
            { touched.confirmPassword && errors.confirmPassword ? <div  style={{ color:"red", marginBottom:10 }}
>{errors.confirmPassword}</div> : null}
            <label htmlFor="role">Role</label>
            <Field   style={{ minHeight:40}}
            name="role"
             as="select" 
             value={values.role}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
        </Field>
{errors.role ? <div  style={{ color:"red"}}>{errors.role}</div> : null}
    <Button  type="submit" variant = 'outlined' sx={{ mt: 3 }}>
     Register
  </Button>
 </Form>
)}
</Formik>
</Box>
);
};

export default UserRegistration;

      




           




     
