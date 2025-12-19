const express = require('express');
const Wishlist = require('../models/Wishlist');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/wishlist
// @desc    Get user wishlist
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id })
      .populate('rooms');

    if (!wishlist) {
      return res.json({
        success: true,
        count: 0,
        data: []
      });
    }

    res.json({
      success: true,
      count: wishlist.rooms.length,
      data: wishlist.rooms
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/wishlist/:roomId
// @desc    Add room to wishlist
// @access  Private
router.post('/:roomId', protect, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        rooms: [req.params.roomId]
      });
    } else {
      // Check if room already in wishlist
      if (wishlist.rooms.includes(req.params.roomId)) {
        return res.status(400).json({ success: false, message: 'Room already in wishlist' });
      }
      wishlist.rooms.push(req.params.roomId);
      await wishlist.save();
    }

    await wishlist.populate('rooms');

    res.json({
      success: true,
      message: 'Room added to wishlist',
      data: wishlist.rooms
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   DELETE /api/wishlist/:roomId
// @desc    Remove room from wishlist
// @access  Private
router.delete('/:roomId', protect, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({ success: false, message: 'Wishlist not found' });
    }

    wishlist.rooms = wishlist.rooms.filter(
      roomId => roomId.toString() !== req.params.roomId
    );
    await wishlist.save();

    await wishlist.populate('rooms');

    res.json({
      success: true,
      message: 'Room removed from wishlist',
      data: wishlist.rooms
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/wishlist/check/:roomId
// @desc    Check if room is in wishlist
// @access  Private
router.get('/check/:roomId', protect, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    const isWishlisted = wishlist && wishlist.rooms.some(
      roomId => roomId.toString() === req.params.roomId
    );

    res.json({
      success: true,
      isWishlisted: !!isWishlisted
    });
  } catch (error) {
    console.error('Check wishlist error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

