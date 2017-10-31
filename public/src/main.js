console.log('main js is connected!');

function createRowString(artwork_url, song_name, artist_name, genre, sc_url, class_name) {
  return `
    <div class='box'><button class='add ${class_name}'>+</button><button class='play ${class_name}'>></button></div>
    <div class='box ${class_name}'><img class='art_small' src="${artwork_url}"></div>
    <div class='box ${class_name}'> ${song_name} </div>
    <div class='box ${class_name}'> ${artist}    </div>
    <div class='box ${class_name}'> ${genre}     </div>
    <div class='${class_name}' style="display: none">${sc_url}</div>
  `;
}

function putRowIntoCollection(rowName){
  const rowBoxes = document.getElementsByClassName(`${rowName}`);
  //row numbers are the instance of .rowNumber
  debugger;
  fetch('/songs', {
    method: 'POST',
    body: {
      song_name: rowBoxes[3].innerHTML,
      artist_name: rowBoxes[4].innerHTML,
      audio_url: rowBoxes[6].innerHTML,
      album_image: rowBoxes[2].innerHTML,
      genre: rowBoxes[5].innerHTML
    },
  }).then(res => res.json())
    .then(json => {
      if (json.complete) {
        //all the song data is getting sent back in json.locals.users_song
        //add the song to user's collection
        const art = json.locals.user_song.album_image;
        const song = json.locals.user_song.song_name;
        const artist = json.locals.user_song.artist_name;
        const genre = json.locals.user_song.genre;
        const sc_url = json.locals.user_song.audio_url;

        const user_table = document.getElementsByClassName('grid')[0];
        const numRows = user_table.childNodes.length;
        const className = 'users' + numRows;
        const newRow = document.createElement('div');
        newRow.className = "row";
        newRow.innerHTML = createRowString(art, song, artist, genre, sc_url, class_name);
        user_table.appendChild(newRow);

        //this WILL allow for duplicates to be added to user collection

        //then will need to implement song router, controller, model for delete and send a delete message on the click of minus button
        // finally will need to load a sc player upon the play button
        // for each row
      }
    })
}

//will be able to just add a deleterowfromcollection
// ISSUE WITH ADDING ROW... WILL NEED A CLASS SPECIFIC
// FOR EACH SIDE 
function grabRowButtons() {
  const addButtons = document.querySelectorAll('.add');
  for(let addButton of addButtons) {
    addButton.addEventListener('click', () => {
      return putRowIntoCollection(addButton.classList[1])
    })
  }
}

document.addEventListener('DOMContentLoaded', grabRowButtons);