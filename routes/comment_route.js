const express = require('express');
const route = express.Router();
const passport = require('passport'); // require passport to authenticate using passport
const commentController = require('../controllers/comment_controller');

route.post('/create-comment' , passport.checkAuthentication, commentController.create_comment);
route.get('/delete/:id' , passport.checkAuthentication, commentController.delete_comment);


module.exports = route;