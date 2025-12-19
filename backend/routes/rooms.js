const express = require('express');
const { body, validationResult } = require('express-validator');
const Room = require('../models/Room');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/rooms
// @desc    Get all rooms with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      city,
      minPrice,
      maxPrice,
      guests,
      placeType,
      stayType,
      amenities,
      search,
      page = 1,
      limit = 20,
      sort = 'createdAt',
      order = 'desc'
    } = req.query;

    const query = { isActive: true };

    // City filter
    if (city) {
      query.city = new RegExp(city, 'i');
    }

    // Price filter
    if (minPrice || maxPrice) {
      query['price.weekday'] = {};
      if (minPrice) query['price.weekday'].$gte = Number(minPrice);
      if (maxPrice) query['price.weekday'].$lte = Number(maxPrice);
    }

    // Guests filter
    if (guests) {
      query['guests.adults'] = { $gte: Number(guests) };
    }

    // Place type filter
    if (placeType && placeType !== 'Any type') {
      query.placeType = placeType;
    }

    // Stay type filter
    if (stayType) {
      query.stayType = stayType;
    }

    // Amenities filter
    if (amenities) {
      const amenityArray = Array.isArray(amenities) ? amenities : [amenities];
      query.amenities = { $all: amenityArray };
    }

    // Search
    if (search) {
      query.$text = { $search: search };
    }

    const sortOrder = order === 'asc' ? 1 : -1;
    const sortObj = { [sort]: sortOrder };

    const skip = (Number(page) - 1) * Number(limit);

    const rooms = await Room.find(query)
      .populate('host', 'name avatar')
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit));

    const total = await Room.countDocuments(query);

    res.json({
      success: true,
      count: rooms.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: rooms
    });
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/rooms/featured
// @desc    Get featured rooms
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const rooms = await Room.find({ isActive: true, isFeatured: true })
      .populate('host', 'name avatar')
      .sort({ rating: -1 })
      .limit(10);

    res.json({
      success: true,
      count: rooms.length,
      data: rooms
    });
  } catch (error) {
    console.error('Get featured rooms error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/rooms/:id
// @desc    Get single room
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate('host', 'name avatar phone email');

    if (!room || !room.isActive) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    res.json({
      success: true,
      data: room
    });
  } catch (error) {
    console.error('Get room error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/rooms
// @desc    Create new room
// @access  Private (Host)
router.post('/', protect, authorize('Host', 'Admin'), [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('price.weekday').isNumeric().withMessage('Weekday price is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const roomData = {
      ...req.body,
      host: req.user._id
    };

    const room = await Room.create(roomData);

    res.status(201).json({
      success: true,
      data: room
    });
  } catch (error) {
    console.error('Create room error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/rooms/:id
// @desc    Update room
// @access  Private (Host/Owner)
router.put('/:id', protect, async (req, res) => {
  try {
    let room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    // Check ownership
    if (room.host.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      data: room
    });
  } catch (error) {
    console.error('Update room error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   DELETE /api/rooms/:id
// @desc    Delete room
// @access  Private (Host/Owner)
router.delete('/:id', protect, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    // Check ownership
    if (room.host.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    room.isActive = false;
    await room.save();

    res.json({
      success: true,
      message: 'Room deleted successfully'
    });
  } catch (error) {
    console.error('Delete room error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

