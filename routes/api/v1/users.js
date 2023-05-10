const express = require('express');
const routes = express.Router();
const apiUserController = require('../../../controllers/api/v1/users');

routes.post('/create-session' , apiUserController.create_session);

module.exports = routes;