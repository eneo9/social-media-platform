const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { createPost, getPosts, likePost } = require('../controllers/postController');

// Create a post (protected)
router.post('/', protect, createPost);

// Get all posts
router.get('/', getPosts);

// Like a post (protected)
router.put('/:id/like', protect, likePost);

module.exports = router;
