require('isomorphic-fetch');

const soundcloud = 'https://api.soundcloud.com/users/';

function formatFavorites(favoritesArr) {
  const favoritesCondensed = [];
  for(let favorite of favoritesArr) {
    favoritesCondensed.push({
      song_name: favorite.title,
      artist: favorite.user.username,
      artwork_url: favorite.artwork_url,
      genre: favorite.genre,
      sc_url: favorite.permalink_url, //this if use oembed soundcloud widget
      stream_url: favorite.stream_url, //use this if own audio object
    })
  }
  return favoritesCondensed;
}

function getFavorites(req, res, next) {
  const client_id = 'client_id=' + process.env.CLIENT_ID;
  const url = soundcloud + req.user.soundcloud_name + '/favorites?' + client_id;
  fetch(url).then((response) => {
    if (response.status >= 400) {
        throw new Error("Cannot get favorites of this soundcloud account!");
    }
    return response.json();
  }).then((json) => {
    return formatFavorites(json);
  }).then((favoritesCondensed)=> {
    req.favorites = favoritesCondensed;
    next();
  }).catch(err => {
    res.status(500).json({error: err});
  });
}

module.exports = {
  getFavorites: getFavorites,
}