const db = require('../db/config.js');

const Song = {};

Song.create = (usersSong) => {
  return db.one(
    `
    IF EXISTS (SELECT * FROM songs WHERE song_name = '$1')
    ELSE INSERT INTO songs 
    (song_name, artist_name, audio_url, album_image, genre)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `, [usersSong.song_name, usersSong.artist_name, usersSong.audio_url, usersSong.album_image, usersSong.genre]
  )
}

Song.relateSongToUser = (song_id, user_id) => {
  return db.one(
    `
    INSERT INTO users_songs (song_id, user_id)
    VALUES ($1, $2)
    RETURNING *
    `, [song_id, user_id]
  )
}

module.exports = Song;