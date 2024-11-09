const Post = require("../Models/post");
const User = require("../Models/user")
// const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// Create Post
exports.createPost = async (req, res) => {
  const { content } = req.body;
  const userId = req.user?._id;

  try {
    // const uploadResult = await cloudinary.uploader.upload(req.file.path, {
    //   folder: "myMate-Posts",
    //   resource_type: "auto",
    // });

    const post = new Post({
      author: userId,
      content,
      // media: uploadResult.secure_url,
      // mediaPublicId: uploadResult.public_id
    });
    await post.save();

    // fs.unlink(req.file.path, (err) => {
    //   if (err) console.error("File deletion error:", err);
    // });

    res.status(201).json(post);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get all post or feed
exports.feed = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('author'); // Sort by newest first
    res.status(200).json(
      posts
    );
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error fetching posts", error: err.message });
  }
};

//get get Post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId); // Find post by its ID
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error fetching post", error: err.message });
  }
};

//get update post
exports.updatePost = async (req, res) => {
  const { content } = req.body;
  const userId = req.user?._id;

  if (!content && !req.file) {
    return res.status(400).json({ message: "Content or a new media file is required to update the post" });
  }

  try {
    const post = await Post.findOne({ _id: req.params.postId, user: userId });

    if (!post) {
      return res.status(404).json({ message: "Post not found or you do not have permission to update it" });
    }

    // If there's a new file, upload it to Cloudinary
    let uploadResult;
    if (req.file) {
      // Delete the old media from Cloudinary
      await cloudinary.uploader.destroy(post.mediaPublicId);

      // Upload the new media to Cloudinary
      uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "myMate-Posts",
        resource_type: 'auto',
      });
    }

    // Update post content and media if provided
    post.content = content || post.content; // Only update content if provided
    if (req.file) {
      post.media = uploadResult.secure_url;
      post.mediaPublicId = uploadResult.public_id; // Update public_id for the new file
    }

    await post.save(); // Save the updated post

    // Optional: Delete the temporary file if it was uploaded
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("File deletion error:", err);
      });
    }

    res.status(200).json(post);
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ message: "Error updating post", error: err.message });
  }
};


//get delete Post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Delete the media from Cloudinary
    if (post.mediaPublicId) {
      await cloudinary.uploader.destroy(post.mediaPublicId);
    }

    // Delete the post from the database
    await post.remove();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res
      .status(500)
      .json({ message: "Error deleting post", error: err.message });
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
    res.status(400).json({ message: "Error liking post", error: err.message });
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
    res.status(400).json({ message: "Error sharing post", error: err.message });
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
    res.status(400).json({ message: "Error saving post", error: err.message });
  }
};
