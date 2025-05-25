const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');


router.get('/logs', inventoryController.getInventoryLogs); // Get yhe Inventory logs
router.get('/status', inventoryController.getCurrentInventory); // Get current stock status of all products
router.get('/lowStock', inventoryController.getLowStockAlerts);    // Get products with low stock 
router.post('/updateInventory', inventoryController.updateInventory);    // Update inventory levels

module.exports = router;
