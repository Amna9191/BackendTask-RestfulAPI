const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  product:    { type: String, ref: 'Product', required: true }, // reference Product by productID
  category:   { type: String },
  quantity:   { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  saleDate:   { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Sale', saleSchema);