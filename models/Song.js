const db = require('../db/config.js');

const Song = {};

// IF EXISTS (SELECT * FROM songs WHERE song_name = '$1')
// ELSE 
Song.create = (usersSong) => {
  return db.oneOrNone(
    `
    SELECT * FROM songs
    WHERE song_name = '$1'
    `
    ).then( result => {
      if(!result) {
      return db.one(
        `
        INSERT INTO songs 
        (song_name, artist_name, audio_url, album_image, genre)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (song_name) DO NOTHING 
        RETURNING *
        `, [usersSong.song_name, usersSong.artist_name, usersSong.audio_url, usersSong.album_image, usersSong.genre]
      )
    } else {
      return result;
    }
  })
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