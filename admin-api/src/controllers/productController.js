// Include Product Model
const Product = require('../models/Product');


// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { productID, name, category, price, stock } = req.body;

    const existingProduct = await Product.findOne({ productID }); // Make sure productID is unique (check if product already exists)
    if (existingProduct) {
      return res.status(400).json({ error: 'Product with this productID already exists.' });
    }

    const product = new Product({ productID, name, category, price, stock });
    await product.save();
    res.status(201).json({ message: 'Product created successfully.', product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product.', details: err.message });
  }
};



// Update a product by productID
exports.updateProduct = async (req, res) => {
  try {
    const { productID } = req.params;   // take productID as parameter
    const updates = req.body;

    // Find and update the product info
    const product = await Product.findOneAndUpdate({ productID }, updates, {
      new: true,
      runValidators: true,
    });

    // If product doesn't exist in database
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.json({ message: 'Product updated successfully.', product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product.', details: err.message });
  }
};



// Delete a product by productID
exports.deleteProduct = async (req, res) => {
  try {
    const { productID } = req.params; // take productID as parameter

    // Find and delete the product with give productID
    const product = await Product.findOneAndDelete({ productID });

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.json({ message: 'Product deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product.', details: err.message });
  }
};



// Get a product by productID
exports.getProductByID = async (req, res) => {
  try {
    const { productID } = req.params;   // take productID as parameter

    // Find product with given productID
    const product = await Product.findOne({ productID });

    // If product not found in database
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product.', details: err.message });
  }
};



// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    // Find all products
    const products = await Product.find();
    
    // Return products as a list of json objects
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products.', details: err.message });
  }
};



// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;    // take category as parameter
    
    // Find products for given category
    const products = await Product.find({ category });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products by category.', details: err.message });
  }
};
