const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

// Routes for api endpoints
router.get('/getSales', saleController.getAllSales);    // Get all sales
router.get('/filterSales', saleController.filterSales); // Get Filter sales
router.get('/DailyRevenue', saleController.getDailyRevenue);    // Get Revenue Grouped Daily
router.get('/weeklyRevenue', saleController.getWeeklyRevenue);  // Get Revenue Grouped Weekly
router.get('/monthlyRevenue', saleController.getMonthlyRevenue);    // Get Revenue Grouped Monthly
router.get('/annualRevenue', saleController.getAnnualRevenue);  // Get Revenue Grouped Annually
router.get('/categoryRevenue', saleController.getRevenueByCategory); // Compare revenue by category
router.post('/createSale', saleController.createSale);  // Create Sale

module.exports = router;
