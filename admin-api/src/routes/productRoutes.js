const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Routes for api endpoints
router.post('/addProduct', productController.createProduct);    //Add product to database
router.put('/updateProduct/:productID', productController.updateProduct);   // Update product's info
router.delete('/deleteProduct/:productID', productController.deleteProduct);    //Delete product from database
router.get('/getProduct/:productID', productController.getProductByID);     // Get product
router.get('/getProducts', productController.getAllProducts);   // Get all products
router.get('/getProductsBycategory/:category', productController.getProductsByCategory);    // Get Products By Category

module.exports = router;
