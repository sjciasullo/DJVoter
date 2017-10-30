const express = require('express');
const userRoutes = express.Router();
const usersController = require('../controllers/users-controller');
const authHelpers = require('../services/auth/auth-helpers');
const soundcloudHelpers = require('../services/soundcloud/soundcloud-helpers');

userRoutes.get('/', authHelpers.loginRequired, soundcloudHelpers.getFavorites,usersController.index);

module.exports = userRoutes;
