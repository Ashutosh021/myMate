const express = require('express')
const router = express.Router()
const {Profile,UpdateBio,AllProfile,About,UpdateProfile,GetUser,UpdateEducation,GetEducation, Follow, Unfollow} = require('../Controllers/user')
const {isLoggedIn} = require('../Middlewares/isLoggedIn')
const upload = require("../Middlewares/upload");

router.get('/profile',isLoggedIn,Profile);
router.get('/profile/all',isLoggedIn,AllProfile);
router.post('/profile/edit/bio',isLoggedIn,UpdateBio);
router.post('/profile/update',upload.single("avatar"),isLoggedIn,UpdateProfile);
router.get('/getuser/:userId',isLoggedIn,GetUser);
router.post('/follow/:userId',isLoggedIn,Follow);
router.post('/unfollow/:userId',isLoggedIn,Unfollow); 

router.post('/update-education/:id',isLoggedIn,UpdateEducation);
router.get('/get-education/:userId',isLoggedIn,GetEducation);

module.exports = router;