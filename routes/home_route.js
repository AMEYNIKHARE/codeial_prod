const express = require('express');
const routes = express.Router();
const controller = require('../controllers/home_controller');
const passport = require('passport'); // require passport to authenticate using passport

routes.get('/home', passport.checkAuthentication, controller.home);
routes.get('/', controller.default);
routes.use('/user', require('./user_route'));
routes.use('/post', require('./post_route'));
routes.use('/comment', require('./comment_route'));

module.exports = routes;