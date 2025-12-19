const express = require('express');
const { body, validationResult } = require('express-validator');
const Transport = require('../models/Transport');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/transport
// @desc    Get all transport services
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { city, search } = req.query;
    const query = { isActive: true };

    if (city) {
      query['location.city'] = new RegExp(city, 'i');
    }

    if (search) {
      query.$text = { $search: search };
    }

    const transports = await Transport.find(query)
      .populate('owner', 'name phone')
      .sort({ 'rating.average': -1 });

    res.json({
      success: true,
      count: transports.length,
      data: transports
    });
  } catch (error) {
    console.error('Get transports error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/transport/:id
// @desc    Get single transport service
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const transport = await Transport.findById(req.params.id)
      .populate('owner', 'name phone email');

    if (!transport || !transport.isActive) {
      return res.status(404).json({ success: false, message: 'Transport service not found' });
    }

    res.json({
      success: true,
      data: transport
    });
  } catch (error) {
    console.error('Get transport error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/transport
// @desc    Create transport service
// @access  Private
router.post('/', protect, [
  body('name').notEmpty().withMessage('Name is required'),
  body('location.city').notEmpty().withMessage('City is required'),
  body('phone').matches(/^[0-9]{10}$/).withMessage('Please provide a valid 10-digit phone number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const transport = await Transport.create({
      ...req.body,
      owner: req.user._id
    });

    await transport.populate('owner', 'name phone');

    res.status(201).json({
      success: true,
      data: transport
    });
  } catch (error) {
    console.error('Create transport error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/transport/:id
// @desc    Update transport service
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const transport = await Transport.findById(req.params.id);

    if (!transport) {
      return res.status(404).json({ success: false, message: 'Transport service not found' });
    }

    if (transport.owner.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const updatedTransport = await Transport.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('owner', 'name phone');

    res.json({
      success: true,
      data: updatedTransport
    });
  } catch (error) {
    console.error('Update transport error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

