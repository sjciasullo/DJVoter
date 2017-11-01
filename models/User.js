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

User.update = (user, userId) => {
  return db.one(
    `
    UPDATE users SET
    username = $1,
    soundcloud_name = $2,
    dj_name = $3
    WHERE id = $4
    RETURNING *
    `, [user.username, user.soundcloud_name, user.dj_name, userId]
  );
};

User.findUserSongs = (userId) => {
  return db.manyOrNone(
    `
    SELECT * FROM songs
    JOIN users_songs ON songs.id = users_songs.song_id
    JOIN users ON users_songs.user_id = users.id
    WHERE users.id = $1;
    `, [userId]
  );
};

module.exports = User;