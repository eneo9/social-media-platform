const express = require('express');
const router = express.Router();
const { createPost, getPosts, likePost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware'); // <-- FIXED

// Create a new post (protected)
router.post('/', protect, createPost);

// Get all posts
router.get('/', getPosts);

// Like a post (protected)
router.post('/:id/like', protect, likePost);

module.exports = router;
