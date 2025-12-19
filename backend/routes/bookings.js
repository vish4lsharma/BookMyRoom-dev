const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/bookings
// @desc    Get user bookings
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { status } = req.query;
    const query = { guest: req.user._id };
    
    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('room', 'title subtitle images city price')
      .populate('guest', 'name phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get single booking
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('room')
      .populate('guest', 'name phone email');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Check if user is authorized
    if (booking.guest._id.toString() !== req.user._id.toString() && 
        booking.room.host.toString() !== req.user._id.toString() &&
        req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/bookings
// @desc    Create new booking
// @access  Private
router.post('/', protect, [
  body('room').notEmpty().withMessage('Room ID is required'),
  body('checkIn').isISO8601().withMessage('Valid check-in date is required'),
  body('checkOut').isISO8601().withMessage('Valid check-out date is required'),
  body('guests.adults').isInt({ min: 1 }).withMessage('At least 1 adult is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { room: roomId, checkIn, checkOut, guests, specialRequests } = req.body;

    // Check if room exists
    const room = await Room.findById(roomId);
    if (!room || !room.isActive) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    // Check if dates are valid
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    if (checkOutDate <= checkInDate) {
      return res.status(400).json({ success: false, message: 'Check-out must be after check-in' });
    }

    if (checkInDate < new Date()) {
      return res.status(400).json({ success: false, message: 'Check-in date cannot be in the past' });
    }

    // Check for conflicting bookings
    const conflictingBooking = await Booking.findOne({
      room: roomId,
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        { checkIn: { $lte: checkOutDate }, checkOut: { $gte: checkInDate } }
      ]
    });

    if (conflictingBooking) {
      return res.status(400).json({ success: false, message: 'Room is not available for these dates' });
    }

    // Calculate total price
    const days = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const weekdayPrice = room.price.weekday || 0;
    const weekendPrice = room.price.weekend || weekdayPrice;
    
    // Simple calculation (can be improved with actual weekend detection)
    const totalPrice = days * weekdayPrice;

    const booking = await Booking.create({
      guest: req.user._id,
      room: roomId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      totalPrice,
      specialRequests,
      status: room.bookingPreferences?.instantBooking ? 'confirmed' : 'pending'
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('room')
      .populate('guest', 'name phone');

    res.status(201).json({
      success: true,
      data: populatedBooking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/bookings/:id/cancel
// @desc    Cancel booking
// @access  Private
router.put('/:id/cancel', protect, [
  body('reason').optional().trim()
], async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Check authorization
    if (booking.guest.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Booking is already cancelled' });
    }

    booking.status = 'cancelled';
    booking.cancellationReason = req.body.reason;
    await booking.save();

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

