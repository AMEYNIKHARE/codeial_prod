const express = require('express');
const routes = express.Router();

routes.use('/v1' , require('./v1'));
routes.use('/v2' , require('./v2'));

module.exports = routes;