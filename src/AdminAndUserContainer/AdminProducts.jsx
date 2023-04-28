import React, { useState, useEffect } from 'react';
import {
  Grid,
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  Typography,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message);
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred. Please try again.');
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <Typography variant="h3" align="center" sx={{ fontFamily:'cursive', fontSize:30, marginTop: '30px', marginBottom:5}}>
        Products
      </Typography>
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price(USD)</TableCell>
                <TableCell>Category ID</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.furnitureCategoryId}</TableCell>
                  <TableCell>
                   <IconButton component={Link} to={`/edit/${product.id}`}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(product.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton component={Link} to="/create">
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
};

export default ProductManagement





         
