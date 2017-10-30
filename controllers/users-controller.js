const bcrypt = require('bcryptjs');
const User = require('../models/user.js');

const usersController = {};

usersController.index = (req,res) => {
  //check out the req object that's getting passed to render
  //console.log(`request: ${JSON.stringify(req.user)}`)
  //we will want to pass this some middleware that gets
  //users songs 
  res.render('./user/user-index', {
    auth: (req.user) ? true: false,
    user: req.user,
    bank: "to-do show user's bank",
    favorites: req.favorites,
  });
};

usersController.create = (req, res) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  User.create({
    username: req.body.username,
    password_digest: hash,
    soundcloud_name: req.body.soundcloud_name,
    dj_name: req.body.dj_name,
  }).then(user => {
    req.login(user, (err) => {
      if(err) return next(err);
      res.redirect('/user');
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}

module.exports = usersController;