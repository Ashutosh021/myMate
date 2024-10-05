const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true, // Added index for faster lookups
  },
  password: {
    type: String,
    required: function() {
      return !this.oauthProvider; // Password is required only if OAuth is not used
    },
    minlength: 6,
  },
  oauthProvider: {
    type: String, // Could be 'google', 'facebook', etc. for OAuth logins
    default: null,
  },
  oauthId: {
    type: String, // Stores OAuth provider's user ID
    default: null,
  },
  bio: {
    type: String,
    default: '',
    trim: true,
  },
  avatar: {
    type: String, // URL of the user's profile image
    default: 'default-avatar-url.png',
  },
  notes: [{
    type: String,
    default: null,
  }],
  weblinks: [{
    type: String,
    default: null,
  }],
  education:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'education', // Refers to education
  }],
  projects:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project', // Refers to projects
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Refers to other users who are following this user
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Refers to users that this user is following
  }],
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post', // Refers to posts created by this user
  }],
  likedPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post', // Refers to posts liked by this user
  }],
  savedPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post', // Refers to posts saved by this user
  }],
  role: {
    type: String,
    enum: ['user', 'admin'], // Role could be expanded in the future
    default: 'user',
  },
  resetPasswordToken: {
    type: String, // Token used for password reset
    default: null,
  },
  resetPasswordExpire: {
    type: Date, // Token expiration time
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // Automatically creates createdAt and updatedAt fields
});



module.exports = mongoose.model('user', userSchema);