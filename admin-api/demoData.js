const mongoose = require('mongoose');
const Product = require('./src/models/Product');
const Sale = require('./src/models/Sale');
const Inventory = require('./src/models/Inventory');

// Replace with your own MongoDB Atlas URI
const MONGODB_URI = "mongodb+srv://dummyUser:1pEuYKNpYkHttrxU@admin.lnejgtm.mongodb.net/?retryWrites=true&w=majority&appName=Admin";

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Sale.deleteMany({});
    await Inventory.deleteMany({});

    const categories = {
      Tech: [
        { productID: 'TECH001', name: 'Wireless Mouse', price: 29.99 },
        { productID: 'TECH002', name: 'Mechanical Keyboard', price: 79.99 },
        { productID: 'TECH003', name: 'Noise Cancelling Headphones', price: 129.99 },
        { productID: 'TECH004', name: '4K Monitor', price: 299.99 },
        { productID: 'TECH005', name: 'USB-C Hub', price: 39.99 }
      ],
      Clothes: [
        { productID: 'CLOTH001', name: 'Denim Jacket', price: 59.99 },
        { productID: 'CLOTH002', name: 'Running Shoes', price: 89.99 },
        { productID: 'CLOTH003', name: 'Graphic T-Shirt', price: 19.99 },
        { productID: 'CLOTH004', name: 'Wool Sweater', price: 49.99 },
        { productID: 'CLOTH005', name: 'Beanie Hat', price: 14.99 }
      ],
      Home: [
        { productID: 'HOME001', name: 'Blender', price: 69.99 },
        { productID: 'HOME002', name: 'Air Purifier', price: 149.99 },
        { productID: 'HOME003', name: 'Coffee Maker', price: 89.99 },
        { productID: 'HOME004', name: 'LED Floor Lamp', price: 39.99 },
        { productID: 'HOME005', name: 'Wall Clock', price: 24.99 }
      ]
    };

    // Insert products
    const allProducts = [];
    for (const category in categories) {
      const products = categories[category].map(p => ({
        ...p,
        category,
        stock: 50
      }));
      allProducts.push(...products);
    }

    await Product.insertMany(allProducts);
    console.log('Seeded products');

    // Helper to create dates
    const daysAgo = (n) => {
      const d = new Date();
      d.setDate(d.getDate() - n);
      return d;
    };

    const salesData = [
      // Daily sales (within last 1 day)
      { productID: 'TECH001', category: 'Tech', quantity: 2, date: daysAgo(0) },
      { productID: 'CLOTH001', category: 'Clothes', quantity: 1, date: daysAgo(0) },
      { productID: 'HOME001', category: 'Home', quantity: 3, date: daysAgo(0) },

      // Weekly sales
      { productID: 'TECH002', category: 'Tech', quantity: 1, date: daysAgo(3) },
      { productID: 'CLOTH002', category: 'Clothes', quantity: 2, date: daysAgo(5) },
      { productID: 'HOME002', category: 'Home', quantity: 1, date: daysAgo(6) },

      // Monthly sales
      { productID: 'TECH003', category: 'Tech', quantity: 2, date: daysAgo(10) },
      { productID: 'CLOTH003', category: 'Clothes', quantity: 1, date: daysAgo(15) },
      { productID: 'HOME003', category: 'Home', quantity: 2, date: daysAgo(20) },

      // Annual sales
      { productID: 'TECH004', category: 'Tech', quantity: 1, date: daysAgo(100) },
      { productID: 'CLOTH004', category: 'Clothes', quantity: 3, date: daysAgo(200) },
      { productID: 'HOME004', category: 'Home', quantity: 2, date: daysAgo(250) }
    ];

    const sales = [];

    for (const s of salesData) {
      const product = await Product.findOne({ productID: s.productID });
      const totalPrice = product.price * s.quantity;

      sales.push({
        product: s.productID,
        category: s.category,
        quantity: s.quantity,
        totalPrice,
        saleDate: s.date
      });

      // Update stock
      product.stock -= s.quantity;
      await product.save();

      // Log inventory change
      await Inventory.create({
        product: s.productID,
        change: -s.quantity,
        reason: 'Seed sale',
        date: s.date
      });
    }

    await Sale.insertMany(sales);
    console.log('Seeded sales and inventory logs for sales');

    // Extra inventory updates
    await Inventory.insertMany([
      {
        product: 'TECH005',
        change: 20,
        reason: 'Restocked',
        date: daysAgo(2)
      },
      {
        product: 'CLOTH005',
        change: -5,
        reason: 'Damaged stock removal',
        date: daysAgo(4)
      }
    ]);

    await Product.updateOne({ productID: 'TECH005' }, { $inc: { stock: 20 } });
    await Product.updateOne({ productID: 'CLOTH005' }, { $inc: { stock: -5 } });

    console.log('Seeded extra inventory updates');
    console.log('Seeding completed successfully!');
    mongoose.disconnect();
  } catch (err) {
    console.error('Seeding failed:', err);
    mongoose.disconnect();
  }
}

seedDatabase();
