const express = require('express');
const route = express.Router();
const User_controller = require('../controllers/user_controller');
const passport = require('passport'); // require passport to authenticate using passport

route.get('/', User_controller.profile);
route.get('/profile', User_controller.profile);
route.get('/sign-in', User_controller.signIn);
route.get('/sign-up', User_controller.signUp);
route.post('/create-account', User_controller.create_account);
// route.post/get takes total 3 arguments, Route, middleware and controller function
// Here we are using passport middleware to authenticate user when user click on sign-in page
route.post('/create-session', passport.authenticate('local', { failureRedirect: '/user/sign-in' }), User_controller.create_session);

module.exports = route;