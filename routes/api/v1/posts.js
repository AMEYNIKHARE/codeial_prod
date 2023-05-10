const express = require('express');
const routes = express.Router();
const passport = require('passport');
const apiPostController = require('../../../controllers/api/v1/posts');

routes.get('/' , passport.authenticate('jwt' , {session : false}), apiPostController.index);
routes.delete('/:id' , passport.authenticate('jwt' , {session : false}), apiPostController.delete_post);

module.exports = routes;