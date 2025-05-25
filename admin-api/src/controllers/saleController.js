// Include Sale and Product Schema
const Sale = require('../models/Sale');
const Product = require('../models/Product');
const mongoose = require('mongoose');



// Create a new sale
exports.createSale = async (req, res) => {
  try {
    const { product, category, quantity, totalPrice, saleDate } = req.body;

    // Check if product exists in database (then only create sale)
    const productExists = await Product.findOne({ productID: product });
    if (!productExists) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    // Create sale object with procided body and save it to database
    const sale = new Sale({ product, category, quantity, totalPrice, saleDate });
    await sale.save();

    res.status(201).json({ message: 'Sale recorded successfully.', sale });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record sale.', details: err.message });
  }
};



// Get all sales (unfiltered)
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find().sort({ saleDate: -1 });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch all sales.', details: err.message });
  }
};



// Filter sales by product, category, and/or date range
exports.filterSales = async (req, res) => {
  try {
    const { product, category, startDate, endDate } = req.body; 

    // Not necessary to have all the filters at once 
    // So first check if provided and then add them to filter dictionary

    const filter = {};  // Create empty filter dictionary
    if (product) filter.product = product;  // if product provided, add it as filter
    if (category) filter.category = category;   // if category provided, add it as filter
    // if start and end date provided, add them as filter
    if (startDate || endDate) {
      filter.saleDate = {};
      if (startDate) filter.saleDate.$gte = new Date(startDate);
      if (endDate) filter.saleDate.$lte = new Date(endDate);
    }

    // Find sales that meet the filter conditions and return sales as newest to oldest
    const sales = await Sale.find(filter).sort({ saleDate: -1 });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: 'Failed to filter sales.', details: err.message });
  }
};



// Revenue analysis by period (helper function for getting sales revenue by period)
const getRevenueGroupedByPeriod = async (groupFormat) => {
  return await Sale.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: groupFormat, date: "$saleDate" } },
        totalRevenue: { $sum: "$totalPrice" },
        totalQuantity: { $sum: "$quantity" },
      }
    },
    { $sort: { _id: 1 } } // return in oldest to newest order
  ]);
};



// Get Revenue Grouped Daily
exports.getDailyRevenue = async (req, res) => {
  try {
    const revenue = await getRevenueGroupedByPeriod("%Y-%m-%d");
    res.json(revenue);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get daily revenue.', details: err.message });
  }
};



// Get Revenue Grouped Weekly
exports.getWeeklyRevenue = async (req, res) => {
  try {
    const revenue = await Sale.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$saleDate" },
            week: { $isoWeek: "$saleDate" }
          },
          totalRevenue: { $sum: "$totalPrice" },
          totalQuantity: { $sum: "$quantity" },
        }
      },
      { $sort: { "_id.year": 1, "_id.week": 1 } }
    ]);
    res.json(revenue);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get weekly revenue.', details: err.message });
  }
};



// Get Revenue Grouped Monthly
exports.getMonthlyRevenue = async (req, res) => {
  try {
    const revenue = await getRevenueGroupedByPeriod("%Y-%m");
    res.json(revenue);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get monthly revenue.', details: err.message });
  }
};



// Get Revenue Grouped Annually
exports.getAnnualRevenue = async (req, res) => {
  try {
    const revenue = await getRevenueGroupedByPeriod("%Y");
    res.json(revenue);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get annual revenue.', details: err.message });
  }
};



// Compare revenue by category
exports.getRevenueByCategory = async (req, res) => {
  try {
    const revenue = await Sale.aggregate([
      {
        $group: {
          _id: "$category",
          totalRevenue: { $sum: "$totalPrice" },
          totalQuantity: { $sum: "$quantity" },
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]);
    res.json(revenue);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get revenue by category.', details: err.message });
  }
};
