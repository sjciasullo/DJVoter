const db = require('../db/config');

const User = {};

User.findByUserName = (username) => {
  return db.oneOrNone(
    `
    SELECT * FROM users
    WHERE username = $1
    `, [username]
  );
};

User.create = (user) => {
  return db.one(
    `
    INSERT INTO users
    (username, password_digest, soundcloud_name, dj_name)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `, [user.username, user.password_digest, user.soundcloud_name, user.dj_name]
  );
};

module.exports = User;