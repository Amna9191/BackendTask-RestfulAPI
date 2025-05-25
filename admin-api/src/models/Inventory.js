const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  product:    { type: String, ref: 'Product', required: true }, // reference Product by productID
  change:     { type: Number, required: true },
  date:       { type: Date, default: Date.now },
  reason:     { type: String }, // reason for change in inventory
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
