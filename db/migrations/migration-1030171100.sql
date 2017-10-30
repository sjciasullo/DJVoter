DROP TABLE IF EXISTS users_song;
CREATE TABLE IF NOT EXISTS users_songs(
  id SERIAL PRIMARY KEY,
  song_id INTEGER REFERENCES songs(id),
  user_id INTEGER REFERENCES users(id)
);

ALTER TABLE users
RENAME COLUMN jamendo_name TO soundcloud_name;