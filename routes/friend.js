const express = require('express');
const routes = express.Router();
const friendController = require('../controllers/friend_controller');

routes.get('/add/:id' , friendController.addFriend );
routes.get('/remove/:id' , friendController.removeFriend );


module.exports = routes;