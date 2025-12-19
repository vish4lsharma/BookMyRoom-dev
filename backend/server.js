const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:8081',
    'http://localhost:19006',
    'http://10.0.2.2:8081',
    'http://10.0.2.2:19006',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookmyroom';

// Validate MongoDB URI
if (!MONGODB_URI || MONGODB_URI.trim() === '') {
  console.error('❌ MONGODB_URI is not set in environment variables');
  console.log('💡 Please set MONGODB_URI in your .env file');
  console.log('   Example: MONGODB_URI=mongodb://localhost:27017/bookmyroom');
  console.log('   Or for MongoDB Atlas: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookmyroom');
} else {
  console.log('🔌 Attempting to connect to MongoDB...');
  console.log('📍 Connection string:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Hide credentials in logs
  
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('✅ MongoDB connected successfully');
      console.log('📊 Database:', mongoose.connection.name);
    })
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err.message);
      console.log('\n💡 Troubleshooting tips:');
      console.log('   1. Check if MongoDB is running (for local)');
      console.log('   2. Verify MONGODB_URI in .env file');
      console.log('   3. For MongoDB Atlas: Check network access and credentials');
      console.log('   4. Ensure connection string format is correct');
      console.log('\n   Local MongoDB: mongodb://localhost:27017/bookmyroom');
      console.log('   MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/bookmyroom');
    });
}

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/transport', require('./routes/transport'));
app.use('/api/upload', require('./routes/upload'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'BookMyRoom API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 3001;

// Listen on all interfaces (0.0.0.0) to allow Android emulator access via 10.0.2.2
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Accessible at: http://localhost:${PORT} and http://10.0.2.2:${PORT} (Android emulator)`);
});

module.exports = app;

