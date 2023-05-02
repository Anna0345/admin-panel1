const express = require('express');
const app = express();
const productsRouter = require('./routes/products');
const registerRouter = require('./routes/register');
const userRouter = require('./routes/users')
const loginRouters = require('./routes/login')
const cors = require('cors');


// Add middleware for parsing JSON request body
app.use(express.json());
app.use(cors());

// Use the products router for '/products' route
app.use('/products', productsRouter);
app.use('/register',registerRouter)
app.use('/users', userRouter)
app.use('/login', loginRouters)

// ... other app configuration and routes

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

