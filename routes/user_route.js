const express = require('express');
const route = express.Router();
const controller = require('../controllers/user_controller');

route.get('/' , controller.profile);
route.get('/profile' , controller.profile);

module.exports = route;