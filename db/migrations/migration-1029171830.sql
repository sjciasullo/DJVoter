CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_digest TEXT NOT NULL,
  name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS songs (
  id SERIAL PRIMARY KEY,
  song_name VARCHAR(255) UNIQUE NOT NULL,
  artist_name VARCHAR(255),
  audio VARCHAR(255),
  album_image VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users_song (
  id SERIAL PRIMARY KEY,
  song_id INTEGER REFERENCES songs(id),
  user_id INTEGER REFERENCES users(id)
);