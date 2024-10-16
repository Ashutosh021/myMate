const express = require('express');
const { createPost,feed,getPost,unlikePost, likePost, sharePost, savePost,updatePost,deletePost } = require('../Controllers/post');
const { isLoggedIn } = require('../Middlewares/isLoggedIn');
const router = express.Router();

// Create Post
router.post('/create', isLoggedIn, createPost);

// get all
router.get('/feed', isLoggedIn, feed);

// get by Id
router.get('/getPost/:postId', isLoggedIn, getPost);

// update Post
router.post('/update/:postId', isLoggedIn, updatePost);

// unlike post
router.post('/like/:postId', isLoggedIn, likePost);



// Share Post
router.post('/share/:postId', isLoggedIn, sharePost);

// Save Post
router.post('/save/:postId', isLoggedIn, savePost);

// delete Post
router.delete('/delete/:postId', isLoggedIn, deletePost);

module.exports = router;
