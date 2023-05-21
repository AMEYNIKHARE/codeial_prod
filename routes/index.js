const express = require('express');
const routes = express.Router();
const homeController = require('../controllers/home_controller');
const passport = require('passport'); // require passport to authenticate using passport

routes.get('/home', passport.checkAuthentication, homeController.home);
routes.get('/', homeController.default);
routes.use('/user', require('./user_route'));
routes.use('/post', require('./post_route'));
routes.use('/comment', require('./comment_route'));
routes.use('/like', require('./like'));
routes.use('/api', require('./api'));
routes.use('/friend', require('./friend'));

module.exports = routes;