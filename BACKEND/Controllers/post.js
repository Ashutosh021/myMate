const Post = require('../Models/post');

// Create Post
exports.createPost = async (req, res) => {
  const { author , content } = req.body;
  try {
    const post = new Post({ user: req.user._id,author, content });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ user:req.user.id,message: 'Error creating post', error: err.message });
  }
};

//get all post or feed
exports.feed = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching posts', error: err.message });
  }
};


//get get Post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId); // Find post by its ID
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching post', error: err.message });
  }
};


//get update post
exports.updatePost = async (req, res) => {
  const { author, content } = req.body;
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.postId },
      { author, content },
      { new: true } // Return the updated document
    );
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: 'Error updating post', error: err.message });
  }
};


//get delete Post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting post', error: err.message });
  }
};




// Like Post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post.likes.includes(req.user._id)) {
      post.likes.pull(req.user._id);
    } else {
      post.likes.push(req.user._id);
    }
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: 'Error liking post', error: err.message });
  }
};

// Share Post
exports.sharePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    post.shares.push(req.user._id);
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: 'Error sharing post', error: err.message });
  }
};

// Save Post
exports.savePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    post.saves.push(req.user._id);
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: 'Error saving post', error: err.message });
  }
};


