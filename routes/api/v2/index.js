const express = require('express');
const routes = express.Router();

routes.use('/posts' , require('./posts'));

module.exports = routes;