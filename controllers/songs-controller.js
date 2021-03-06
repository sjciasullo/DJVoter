const Song = require('../models/Song');

const songsController = {};

songsController.create = (req, res, next) => {
  //do i have access to the user info ???
  // let's say it already lives on req.user...?
  //check out the req object that's getting passed to render
  console.log(`foo: ${JSON.stringify(req.body)}`)
  Song.create({
    song_name: req.body.song_name,
    artist_name: req.body.artist_name,
    audio_url: req.body.audio_url,
    album_image: req.body.album_image,
    genre: req.body.genre,
    // user_id: req.user.id
  }).then(users_song => {
    res.locals.users_song= users_song;
    next();
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      err: err,
      completed: false,
    });
  })
}

songsController.createUsersSong = (req, res) => {
  Song.relateSongToUser(res.locals.users_song.id, req.body.user_id)
    .then(users_song => {
      console.log(users_song);
      res.json({
        success: true,
        status: 200
      })
    }).catch(err => {
      res.status(500).json(err);
    })
}

songsController.delete = (req, res) => {
  console.log('song name: ', req.body.song_name);
  console.log('user id : ', req.body.user_id);
  Song.destroy(req.body.song_name, req.body.user_id)
    .then( () => {
      res.json({
        completed: true,
      })
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        err: err,
        completed: false,
      });
    })
}

module.exports = songsController;