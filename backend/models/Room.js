const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  address: {
    street: String,
    locality: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  images: [{
    url: String,
    publicId: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  price: {
    weekday: {
      type: Number,
      required: true,
      min: 0
    },
    weekend: {
      type: Number,
      min: 0
    },
    unit: {
      type: String,
      enum: ['hour', 'day', 'night'],
      default: 'day'
    }
  },
  placeType: {
    type: String,
    enum: ['Entire place', 'Private room', 'Shared room'],
    required: true
  },
  stayType: {
    type: String,
    enum: ['Room', 'Apartment', 'House', 'Villa', 'Other'],
    required: true
  },
  guests: {
    adults: {
      type: Number,
      required: true,
      min: 1
    },
    children: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  bedrooms: {
    type: Number,
    required: true,
    min: 0
  },
  beds: {
    type: Number,
    required: true,
    min: 1
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 0
  },
  amenities: [{
    type: String
  }],
  highlights: [{
    type: String
  }],
  availableFrom: {
    type: Date,
    default: Date.now
  },
  bookingPreferences: {
    instantBooking: {
      type: Boolean,
      default: false
    },
    minimumStay: {
      type: Number,
      default: 1
    },
    maximumStay: {
      type: Number
    },
    checkInTime: String,
    checkOutTime: String
  },
  specialOffers: [{
    title: String,
    description: String,
    discount: Number,
    validFrom: Date,
    validTo: Date
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
  isFeatured: {
    type: Boolean,
    default: false
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

// Update updatedAt before saving
roomSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for search
roomSchema.index({ city: 'text', title: 'text', description: 'text' });
roomSchema.index({ 'address.coordinates': '2dsphere' });
roomSchema.index({ host: 1, isActive: 1 });

module.exports = mongoose.model('Room', roomSchema);

