
import { useState } from 'react';
import styled from 'styled-components';
import { TextField, Button, Typography } from '@mui/material';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.5rem;
  background-color: #f0f0f0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 2rem;
`;

const Heading = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333333;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 1rem;
  label {
    font-size: 1.2rem;
    font-weight: bold;
    color: #000000;
  }
  input {
    font-size: 1.2rem;
    color: #666666;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #cccccc;
  }
`;
const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  color: #ffffff;
  background-color: #795548;
  padding: 0.5rem 2rem;
  margin:auto;
  &:hover {
    background-color: #603f32;
  }
`;


const StyledErrorMessage = styled(Typography)`
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: #000000;
`;


const ProductCreate = () => {
  const [successMessage, setSuccessMessage] = useState('');

  const [newProduct, setNewProduct] = useState({
    name: '',
    furnitureCategoryId: '',
    price: '',
  });
  const [error, setError] = useState('');

  const handleCreate = async (event) => {
    event.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
  
      // Check if furnitureCategoryId is not empty
      if (!newProduct.furnitureCategoryId) {
        throw new Error('Please enter a valid furniture category ID');
      }
  
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newProduct.name,
          furnitureCategoryId: newProduct.furnitureCategoryId,
          price: newProduct.price,
        }),
      };
  
      const response = await fetch('http://localhost:3000/products', options);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
  
      const data = await response.json();
      setNewProduct({
        name: '',
        furnitureCategoryId: '',
        price: '',
      });
      setSuccessMessage('Product created successfully!');
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    }
  };
     

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Wrapper>
      <Heading>Create a New Product</Heading>
      <form onSubmit={handleCreate}>
        <StyledTextField
          label="Product Name"
          id="name"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
        />
        <StyledTextField
          label="Furniture Category ID"
          id="furnitureCategoryId"
          name="furnitureCategoryId"
          value={newProduct.furnitureCategoryId}
          onChange={handleChange}
        />
        <StyledTextField
          label="Price"
          id="price"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
        />
        <StyledButton type="submit">Create Product</StyledButton>
        {successMessage && (
  <StyledErrorMessage >
    {successMessage}
  </StyledErrorMessage>
)}
        {error && (
          <StyledErrorMessage color="error">
            {error}
          </StyledErrorMessage>
        )}
      </form>
    </Wrapper>
  );
};

export default ProductCreate;


  








