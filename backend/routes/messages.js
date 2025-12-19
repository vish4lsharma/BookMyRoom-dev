const express = require('express');
const { body, validationResult } = require('express-validator');
const { Conversation, Message } = require('../models/Message');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/messages/conversations
// @desc    Get all conversations for user
// @access  Private
router.get('/conversations', protect, async (req, res) => {
  try {
    const { archived } = req.query;
    
    let query = { participants: req.user._id };
    
    if (archived === 'true') {
      query['archivedBy.user'] = req.user._id;
    } else {
      query.$or = [
        { 'archivedBy.user': { $ne: req.user._id } },
        { archivedBy: { $size: 0 } }
      ];
    }

    const conversations = await Conversation.find(query)
      .populate('participants', 'name avatar role')
      .populate('lastMessage')
      .sort({ lastMessageAt: -1 });

    res.json({
      success: true,
      count: conversations.length,
      data: conversations
    });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/messages/conversations/:id
// @desc    Get conversation with messages
// @access  Private
router.get('/conversations/:id', protect, async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id)
      .populate('participants', 'name avatar role');

    if (!conversation) {
      return res.status(404).json({ success: false, message: 'Conversation not found' });
    }

    // Check if user is participant
    if (!conversation.participants.some(p => p._id.toString() === req.user._id.toString())) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const messages = await Message.find({ conversation: conversation._id })
      .populate('sender', 'name avatar')
      .sort({ createdAt: 1 });

    // Mark messages as read
    await Message.updateMany(
      { conversation: conversation._id, sender: { $ne: req.user._id }, isRead: false },
      { isRead: true, readAt: new Date() }
    );

    res.json({
      success: true,
      data: {
        conversation,
        messages
      }
    });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/messages/conversations
// @desc    Create or get conversation
// @access  Private
router.post('/conversations', protect, [
  body('participant').notEmpty().withMessage('Participant ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { participant } = req.body;

    // Check if conversation already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [req.user._id, participant] }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user._id, participant]
      });
    }

    await conversation.populate('participants', 'name avatar role');

    res.json({
      success: true,
      data: conversation
    });
  } catch (error) {
    console.error('Create conversation error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/messages
// @desc    Send message
// @access  Private
router.post('/', protect, [
  body('conversation').notEmpty().withMessage('Conversation ID is required'),
  body('content').trim().notEmpty().withMessage('Message content is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { conversation: conversationId, content } = req.body;

    // Verify conversation exists and user is participant
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ success: false, message: 'Conversation not found' });
    }

    if (!conversation.participants.includes(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const message = await Message.create({
      conversation: conversationId,
      sender: req.user._id,
      content
    });

    // Update conversation
    conversation.lastMessage = message._id;
    conversation.lastMessageAt = new Date();
    await conversation.save();

    await message.populate('sender', 'name avatar');

    res.status(201).json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/messages/conversations/:id/archive
// @desc    Archive/unarchive conversation
// @access  Private
router.put('/conversations/:id/archive', protect, async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      return res.status(404).json({ success: false, message: 'Conversation not found' });
    }

    const archivedIndex = conversation.archivedBy.findIndex(
      a => a.user.toString() === req.user._id.toString()
    );

    if (archivedIndex > -1) {
      // Unarchive
      conversation.archivedBy.splice(archivedIndex, 1);
    } else {
      // Archive
      conversation.archivedBy.push({ user: req.user._id });
    }

    await conversation.save();

    res.json({
      success: true,
      data: conversation
    });
  } catch (error) {
    console.error('Archive conversation error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

