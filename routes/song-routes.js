const express = require('express');
const songRouter = express.Router();
const songsController = require('../controllers/songs-controller');
const authHelpers = require('../services/auth/auth-helpers')

songRouter.post('/', songsController.create, songsController.createUsersSong);
songRouter.delete('/', songsController.delete);


module.exports = songRouter;
