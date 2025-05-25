const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productID: { type: String , required: true, unique: true }, // Assume Admin user will set productID based on product
  name:     { type: String, required: true },
  category: { type: String },
  price:    { type: Number, required: true },
  stock:    { type: Number, required: true, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
