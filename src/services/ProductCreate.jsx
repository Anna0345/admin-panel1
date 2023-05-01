import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { TextField, Button, Typography } from '@mui/material';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background-color: #fff9e6;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 2rem;
`;

const fadeIn = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
  }
`;

const Heading = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #3e2723;
  animation: ${fadeIn} 1s ease-in-out;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  max-width: 20rem;
  margin-bottom: 1rem;
  label {
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    font-weight: bold;
    color: #5d4037;
  }
  input {
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    color: #4e342e;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 2px solid #4e342e;
    animation: ${fadeIn} 1s ease-in-out;
  }
`;

const StyledButton = styled(Button)`
  border-radius: 0.5rem;
  color: #fff;
  padding: 0.5rem 2rem;
  margin: auto;
  margin-top: 2rem;
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  &.MuiButton-root {
    background-color: #3e2723;
    color: #fff;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #1b0000;
      transform: translateY(-5px);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
    
    &:active {
      background-color: #4e342e;
      transform: translateY(0);
      box-shadow: none;
      transition: all 0.2s ease-in-out;
    }
    
    &::before {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #fff;
      border-radius: 50%;
      transform: scale(0);
      transition: all 0.3s ease-in-out;
    }
    
    &:active::before {
      transform: scale(40);
      opacity: 0;
      transition: all 0.3s ease-in-out;
    }
  }
`;


const StyledSuccessMessage = styled(Typography)`
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: #000000;
  animation: ${fadeIn} 1s ease-in-out;
`;

    




const StyledErrorMessage = styled(Typography)`
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: red;
  animation: ${fadeIn} 1s ease-in-out;
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
      setError('The Furniture Category must have a valid id and the fields can not be empty');
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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <StyledTextField
          label="Product Name"
          id="name"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          variant="outlined"
          margin="dense"
          size="small"
          color="secondary"
          sx={{ width: "100%" }}
        />
        <StyledTextField
          label="Furniture Category ID"
          id="furnitureCategoryId"
          name="furnitureCategoryId"
          value={newProduct.furnitureCategoryId}
          onChange={handleChange}
          variant="outlined"
          margin="dense"
          size="small"
        />
        <StyledTextField
          label="Price"
          id="price"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          variant="outlined"
          margin="dense"
          size="small"
        />
        <StyledButton onClick={handleCreate}>
          Create Product
        </StyledButton>
        {successMessage && (
          <StyledSuccessMessage>
            {successMessage}
          </StyledSuccessMessage>
        )}
        {error && (
          <StyledErrorMessage>
            {error}
          </StyledErrorMessage>
        )}
      </div>
    </Wrapper>
  );
};

export default ProductCreate;