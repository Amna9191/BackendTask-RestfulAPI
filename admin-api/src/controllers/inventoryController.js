// Include the Inventory and Product Models
const Inventory = require('../models/Inventory');
const Product = require('../models/Product');



// Get full inventory history (changes made over time)
exports.getInventoryLogs = async (req, res) => {
  try {
    // Get all inventory logs and return them sorted from newest to oldest
    const logs = await Inventory.find().sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inventory logs', details: err.message });
  }
};



// Get current inventory status of all products
exports.getCurrentInventory = async (req, res) => {
  try {
    // Get the current stok status for all the products
    const products = await Product.find({}, 'productID name stock category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch current inventory', details: err.message });
  }
};



// Get products with low stock
exports.getLowStockAlerts = async (req, res) => {
  try {
    // Get products that have stock below the provided threshold or a default low value 10
    const threshold = parseInt(req.query.threshold) || 10;
    const lowStockProducts = await Product.find({ stock: { $lt: threshold } });
    res.json(lowStockProducts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch low stock alerts', details: err.message });
  }
};



// Update inventory and log the change
exports.updateInventory = async (req, res) => {
  try {
    const { productID, change, reason } = req.body;

    const product = await Product.findOne({ productID });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    product.stock += change;
    await product.save();

    // Log the update in inventory
    const log = new Inventory({
      product: productID,
      change,
      reason,
    });
    await log.save();

    res.json({ message: 'Inventory updated', updatedStock: product.stock });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update inventory', details: err.message });
  }
};
