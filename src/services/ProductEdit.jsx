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

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  furnitureCategoryId: Yup.string().required('Category ID is required'),
  price: Yup.number().required('Price is required').positive('Price must be a positive number'),
  createdAt: Yup.date().required('Created At is required'),
  updatedAt: Yup.date().required('Updated At is required'),
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    background: '#f5f5f5',
    borderRadius: 100,
    '&:hover fieldset': {
      borderColor: '#b8b8b8',
    },
  },
  '& .Mui-focused fieldset': {
    borderColor: '#b8b8b8',
  },
});

const StyledButton = styled(Button)({
  alignSelf:"center",
  background: 'linear-gradient(45deg, #8D6E63 30%, #A1887F 90%)',
  borderRadius: "20%",
  width:"30%",
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
});

const ProductEdit = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
          setFormData(data);
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

 

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      // Get the token from localStorage
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
        setFormData(data);
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
      {errors && (
        <Typography variant="body1" color="error" mb={2}>
          {errors}
        </Typography>
      )}
      {successMessage && (
        <Typography variant="body1" color="success" mb={2}>
          {successMessage}
        </Typography>
      )}
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
              <StyledTextField
                sx={{ mb: 2 }}
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <StyledTextField
                sx={{ mb: 2 }}
                label="Category ID"
                name="furnitureCategoryId"
                value={values.furnitureCategoryId}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.furnitureCategoryId && Boolean(errors.furnitureCategoryId)}
                helperText={touched.furnitureCategoryId && errors.furnitureCategoryId}
              />
              <StyledTextField
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
              <StyledTextField
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
              <StyledTextField
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
  



 
     




