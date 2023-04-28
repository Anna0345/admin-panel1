import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


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
  
  return (
    <div>
     <Typography variant="h4" align="center" sx={{ marginTop:2,padding: '10px' }}>
        Products
      </Typography>      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
      {/* Render products data */}
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TableContainer component={Paper} sx={{ maxWidth: 600, margin: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map(product => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.furnitureCategoryId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
};

export default ProductManagement;