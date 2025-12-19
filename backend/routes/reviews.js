const express = require('express');
const { body, validationResult } = require('express-validator');
const Review = require('../models/Review');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/reviews/room/:roomId
// @desc    Get reviews for a room
// @access  Public
router.get('/room/:roomId', async (req, res) => {
  try {
    const reviews = await Review.find({ room: req.params.roomId, isVisible: true })
      .populate('guest', 'name avatar')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/reviews
// @desc    Create review
// @access  Private
router.post('/', protect, [
  body('booking').notEmpty().withMessage('Booking ID is required'),
  body('rating.overall').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { booking: bookingId, rating, comment, tags } = req.body;

    // Verify booking exists and belongs to user
    const booking = await Booking.findById(bookingId)
      .populate('room');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.guest.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (booking.status !== 'completed') {
      return res.status(400).json({ success: false, message: 'Can only review completed bookings' });
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ booking: bookingId });
    if (existingReview) {
      return res.status(400).json({ success: false, message: 'Review already exists for this booking' });
    }

    const review = await Review.create({
      booking: bookingId,
      room: booking.room._id,
      guest: req.user._id,
      host: booking.room.host,
      rating,
      comment,
      tags
    });

    // Update room rating
    const roomReviews = await Review.find({ room: booking.room._id });
    const avgRating = roomReviews.reduce((sum, r) => sum + r.rating.overall, 0) / roomReviews.length;
    
    await Room.findByIdAndUpdate(booking.room._id, {
      'rating.average': avgRating,
      'rating.count': roomReviews.length
    });

    await review.populate('guest', 'name avatar');

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

