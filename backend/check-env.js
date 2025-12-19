// Script to check environment variables
require('dotenv').config();

console.log('🔍 Checking environment variables...\n');

const required = ['MONGODB_URI', 'JWT_SECRET'];
const optional = ['PORT', 'NODE_ENV', 'FRONTEND_URL', 'TWILIO_ACCOUNT_SID', 'CLOUDINARY_CLOUD_NAME'];

let hasErrors = false;

// Check required variables
console.log('📋 Required variables:');
required.forEach(key => {
  const value = process.env[key];
  if (!value || value.trim() === '') {
    console.log(`  ❌ ${key}: NOT SET`);
    hasErrors = true;
  } else {
    // Hide sensitive values
    if (key === 'MONGODB_URI') {
      const hidden = value.replace(/\/\/[^:]+:[^@]+@/, '//***:***@');
      console.log(`  ✅ ${key}: ${hidden}`);
    } else if (key === 'JWT_SECRET') {
      console.log(`  ✅ ${key}: ${'*'.repeat(Math.min(value.length, 20))}... (${value.length} chars)`);
    } else {
      console.log(`  ✅ ${key}: ${value}`);
    }
  }
});

// Check optional variables
console.log('\n📋 Optional variables:');
optional.forEach(key => {
  const value = process.env[key];
  if (value) {
    console.log(`  ✅ ${key}: ${value}`);
  } else {
    console.log(`  ⚠️  ${key}: Not set (using default)`);
  }
});

// Validate MongoDB URI format
const mongoUri = process.env.MONGODB_URI;
if (mongoUri) {
  console.log('\n🔍 MongoDB URI validation:');
  
  if (mongoUri.startsWith('mongodb://') || mongoUri.startsWith('mongodb+srv://')) {
    console.log('  ✅ Format looks correct');
    
    if (mongoUri.includes('localhost') || mongoUri.includes('127.0.0.1')) {
      console.log('  ℹ️  Using local MongoDB');
      console.log('  💡 Make sure MongoDB is running: mongod');
    } else if (mongoUri.includes('mongodb+srv://')) {
      console.log('  ℹ️  Using MongoDB Atlas (Cloud)');
      console.log('  💡 Make sure your IP is whitelisted in Atlas');
    }
  } else {
    console.log('  ❌ Invalid format!');
    console.log('  💡 Should start with mongodb:// or mongodb+srv://');
    hasErrors = true;
  }
}

// Validate JWT Secret
const jwtSecret = process.env.JWT_SECRET;
if (jwtSecret && jwtSecret.length < 32) {
  console.log('\n⚠️  JWT_SECRET warning:');
  console.log('  ⚠️  JWT_SECRET should be at least 32 characters for security');
  console.log('  💡 Consider using a longer, random string');
}

console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ Some required variables are missing!');
  console.log('💡 Please check your .env file');
  process.exit(1);
} else {
  console.log('✅ All required variables are set!');
  console.log('💡 You can now start the server with: npm run dev');
}

