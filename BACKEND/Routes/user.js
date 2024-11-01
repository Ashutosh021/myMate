const express = require('express')
const router = express.Router()
const {Profile,UpdateProfile,GetUser, Follow, Unfollow} = require('../Controllers/user')
const {isLoggedIn} = require('../Middlewares/isLoggedIn')
const upload = require("../Middlewares/upload");

router.get('/profile',isLoggedIn,Profile);
router.post('/profile/update',upload.single("avatar"),isLoggedIn,UpdateProfile);
router.get('/getuser/:userId',isLoggedIn,GetUser);
router.post('/follow/:userId',isLoggedIn,Follow);
router.post('/unfollow/:userId',isLoggedIn,Unfollow); 

module.exports = router;