const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Transport service name is required'],
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    city: {
      type: String,
      required: true
    },
    address: {
      type: String
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  phone: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  image: {
    url: String,
    publicId: String
  },
  vehicleTypes: [{
    type: {
      type: String,
      enum: ['car', 'truck', 'van', 'motorcycle', 'other']
    },
    capacity: Number,
    pricePerKm: Number
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

transportSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

transportSchema.index({ 'location.city': 'text', name: 'text' });
transportSchema.index({ owner: 1, isActive: 1 });

module.exports = mongoose.model('Transport', transportSchema);

