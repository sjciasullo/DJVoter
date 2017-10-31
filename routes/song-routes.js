const express = require('express');
const songRouter = express.Router();
const songsController = require('../controllers/songs-controller');
const authHelpers = require('../services/auth/auth-helpers')

songRouter.post('/', authHelpers.loginRedirect, songsController.create, songsController.createUsersSong);

module.exports = songRouter;
