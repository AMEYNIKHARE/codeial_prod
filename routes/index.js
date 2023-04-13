const express = require('express');
const routes = express.Router();
const controller = require('../controllers/home_controller');

routes.get('/home' , controller.home);
routes.get('/' , controller.home);
routes.use('/user' , require('./user_route'));

module.exports = routes;