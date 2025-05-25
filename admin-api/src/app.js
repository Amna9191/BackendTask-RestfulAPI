require('dotenv').config();
const express   = require('express');
const connectDB = require('./config/db'); // to connect to database

const app = express();
connectDB(); // connect to database

app.use(express.json());

// Route Imports
const productRoutes = require('./routes/productRoutes');
const salesRoutes = require('./routes/salesRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

// Mount API routes
app.use('/api/products', productRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/inventory', inventoryRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

