const express = require('express');
const router = express.Router();
const comments = require('../controllers/comments');
const middleware = require('../middleware');
const catchAsync = require('../utils/catchAsync');

router.post("/add/:id",middleware.isLoggedIn,catchAsync(comments.addComment));
router.delete("/delete/:commentId/:id",middleware.isLoggedIn,middleware.isCommentAuthorized,catchAsync(comments.deleteComment));

module.exports = router;