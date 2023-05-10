const express = require('express');
const routes = express.Router();
const postController = require('../../../controllers/api/v2/posts');

routes.get('/' , postController.index);

module.exports = routes;