const bcrypt = require('bcryptjs');
const User = require('../models/user.js');

const usersController = {};

usersController.index = (req,res) => {
  //check out the req object that's getting passed to render
  //console.log(`request: ${JSON.stringify(req.user)}`)
  //we will want to pass this
  res.render('./user/user-index', {user: req.user});
};

usersController.create = (req, res) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  User.create({
    username: req.body.username,
    password_digest: hash,
    jamendo_name: req.body.jamendo_name,
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