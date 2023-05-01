import { useParams } from 'react-router-dom';
import React,{useState,useEffect} from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import {
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSpring, animated } from 'react-spring';



const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  furnitureCategoryId: Yup.string().required('Category ID is required'),
  price: Yup.number().required('Price is required').positive('Price must be a positive number'),
  createdAt: Yup.date().required('Created At is required'),
  updatedAt: Yup.date().required('Updated At is required'),
});








const StyledButton = styled(animated(Button)) `
  align-self:center;
  background: linear-gradient(to bottom, #8B4513, #FFA500);
  color: #fff;
  padding: 12px 36px;
  width:50%;
  position: relative;
  margin-top:10px;
  overflow: hidden;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 0 0 2px #ffbe0b, 0 0 20px rgba(255, 110, 157, 0.5),
    inset 0 0 0 2px #fff;
  transition: all 0.3s ease-out;
  &:hover {
    box-shadow: 0 0 0 3px #ffbe0b, 0 0 40px rgba(255, 110, 157, 0.6),
      inset 0 0 0 2px #fff;
  }
  &:active {
    box-shadow: 0 0 0 3px #ffbe0b, 0 0 40px rgba(255, 110, 157, 0.6),
      inset 0 0 0 2px #fff;
  }
  &:focus {
    outline: none;
  }
`; 
const StyledTextField = styled(animated(TextField))`
  & .MuiOutlinedInput-root {
    background: #f5f5f5;
    border-radius: 100px;
    &:hover fieldset {
      border-color: #b8b8b8;
    }
  }
  & .Mui-focused fieldset {
    border-color: #b8b8b8;
  }
 
`;









const ProductEdit = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          const errorData = await response.json();
          setErrors(errorData.message);
        }
      } catch (err) {
        console.error(err);
        setErrors('An error occurred. Please try again.');
      }
    };
    fetchProduct();
  }, [id]);
 
  const successAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: successMessage ? 1 : 0 },
    config: { duration: 300 },
  });

  const animationProps = useSpring({
    from: { transform: 'scale(0.9)' },
    to: { transform: 'scale(1)' },
  });
 



  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem('token');
  
      // Make the fetch request with the token in the header
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(values)
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setProduct(data);
        setSuccessMessage('Product updated successfully!');
      } else {
        const errorData = await response.json();
        setErrors(errorData.message);
      }
      setSubmitting(false);
    } catch (err) {
      console.error(err);
      setErrors('An error occurred. Please try again.');
      setSubmitting(false);
    }
  };
  
  


  return (
    <Box sx={{ marginTop:5,maxWidth: 600, mx: 'auto' }}>
      <Typography 
      variant="h5" 
      component="h2" 
      mb={3}
      style = {{display:"flex", justifyContent:"center", alignSelf:"center"}}>
        Edit Product
      </Typography>
    
   
      {Object.keys(product).length > 0 && (
        <Formik
          initialValues={{
            name: product.name ?? '',
            furnitureCategoryId: product.furnitureCategoryId ?? '',
            price: product.price ?? '',
            createdAt: product.createdAt ?? '',
            updatedAt: product.updatedAt ?? '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              < StyledTextField 
                style = {animationProps}
                sx={{ mb: 2 }}
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              < StyledTextField 
                style = {animationProps}
                sx={{ mb: 2 }}
                label="Category ID"
                name="furnitureCategoryId"
                value={values.furnitureCategoryId}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.furnitureCategoryId && Boolean(errors.furnitureCategoryId)}
                helperText={touched.furnitureCategoryId && errors.furnitureCategoryId}
              />
              < StyledTextField   
                style = {animationProps}
                sx={{ mb: 2 }}
                label="Price"
                name="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
                type="number"
              />
              < StyledTextField 
               style = {animationProps}
                sx={{ mb: 2 }}
                label="Created At"
                name="createdAt"
                value={values.createdAt}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.createdAt && Boolean(errors.createdAt)}
                helperText={touched.createdAt && errors.createdAt}
                type="datetime-local"
              />
              < StyledTextField 
                style = {animationProps}
                sx={{ mb: 2 }}
                label="Updated At"
                name="updatedAt"
                value={values.updatedAt}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.updatedAt && Boolean(errors.updatedAt)}
                helperText={touched.updatedAt && errors.updatedAt}
                type="datetime-local"
              />
              
               <animated.div style={successAnimation}>{successMessage}</animated.div>
              <StyledButton variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                Update Product
              </StyledButton>
            </form>
          )}
        </Formik>
      )}
    </Box>
  );
     }
     export default ProductEdit
  



 
     




