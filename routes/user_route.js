const express = require('express');
const route = express.Router();
const User_controller = require('../controllers/user_controller');

route.get('/' , User_controller.profile);
route.get('/profile' , User_controller.profile);
route.get('/sign-in' , User_controller.signIn);
route.get('/sign-up' , User_controller.signUp);
route.post('/create-account' , User_controller.create_account);
route.post('/create-session' , User_controller.create_session);

module.exports = route;