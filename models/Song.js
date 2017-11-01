const db = require('../db/config.js');

const Song = {};

// IF EXISTS (SELECT * FROM songs WHERE song_name = '$1')
// ELSE 
Song.create = (usersSong) => {
  return db.oneOrNone(
    `
    SELECT * FROM songs
    WHERE song_name = $1
    `, [usersSong.song_name]
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

// Song.destroy = (song_name, user_id) => {
//   return db.none(
//     `
//     DELETE FROM users_songs
//     WHERE song_id IN 
//       (SELECT id FROM songs 
//         WHERE song_name = $1)
//     AND users_songs.user_id = $2
//     `, [song_name, user_id]
//   );
// }

Song.destroy = (song_name, user_id) => {
  return db.none(
    `
    DELETE FROM users_songs
    WHERE id IN 
      (SELECT users_songs.id FROM users_songs 
        JOIN songs ON songs.id = users_songs.song_id
        WHERE songs.song_name = $1
        LIMIT 1)
    AND users_songs.user_id = $2
    `, [song_name, user_id]
  );
}

// delete from users_songs
// where id in (select id from users_songs 
//             join songs on songs.id = users_songs.song_id
//             where songs.song_name = $1 )

module.exports = Song;