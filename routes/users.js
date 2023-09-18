const express = require('express');
const router = express.Router();
const User = require('../models/users');
const passport = require('passport');
const users = require('../controllers/users');
const middleware = require('../middleware');
const catchAsync = require('../utils/catchAsync');

router.get("/register",middleware.login,users.registration);

router.post("/register",middleware.login,catchAsync(users.resigterUser));

router.get("/login",middleware.login,users.loginForm);

router.post("/login",middleware.login,passport.authenticate('local',{failureFlash:true,failureRedirect:"insights/user/login"}),users.loginUser);

router.get("/logout",users.logoutUser);

module.exports = router;
