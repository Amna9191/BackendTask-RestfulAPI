const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://dummyUser:1pEuYKNpYkHttrxU@admin.lnejgtm.mongodb.net/?retryWrites=true&w=majority&appName=Admin";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI); // No options needed in recent versions
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

