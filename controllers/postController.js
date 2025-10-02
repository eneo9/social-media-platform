const Post = require('../models/Post');

// Create a new post
const createPost = async (req, res) => {
  try {
    const post = new Post({
      content: req.body.content,
      user: req.user.id
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Like a post
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Prevent duplicate likes
    if (post.likes.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already liked this post' });
    }

    post.likes.push(req.user.id);
    await post.save();

    res.json({ message: 'Post liked!', post });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createPost, getPosts, likePost };
