const express = require('express');
const routes = express.Router();
const likeController = require('../controllers/like_controller');


routes.get('/toggle', likeController.toggleLike);


module.exports = routes;