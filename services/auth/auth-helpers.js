const bcrypt = require('bcryptjs');

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function loginRedirect(req,res,next) {
  console.log('test the auth-helper')
  if(req.user) return res.redirect('/user');
  return next();
}

function loginRequired(req,res,next) {
  console.log(`req without user: ${JSON.stringify(req.user)}`)
  if(!req.user) return res.redirect('/auth/login');
  
  return next();
}

module.exports = {
  comparePass: comparePass,
  loginRedirect: loginRedirect,
  loginRequired: loginRequired,
};

