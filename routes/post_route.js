const express = require('express');
const route = express.Router();
const passport = require('passport'); // require passport to authenticate using passport
const postController = require('../controllers/post_controller');

route.post('/create-post' , passport.checkAuthentication, postController.create_post);


module.exports = route;