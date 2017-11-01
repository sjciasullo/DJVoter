console.log('main js is connected!');

function createRowString(artwork_url, song_name, artist_name, genre, sc_url, class_name) {
  return `
    <div class='box'><button class='add ${class_name}'>+</button><button class='play ${class_name}'>></button></div>
    <div class='box ${class_name}'><img class='art_small' src="${artwork_url}"></div>
    <div class='box ${class_name}'> ${song_name} </div>
    <div class='box ${class_name}'> ${artist_name}    </div>
    <div class='box ${class_name}'> ${genre}     </div>
    <div class='${class_name}' style="display: none">${sc_url}</div>
  `;
}

function putRowIntoCollection(rowName){
  const rowBoxes = document.getElementsByClassName(`${rowName}`);
  //row numbers are the instance of .rowNumber
  let hidden_id = document.getElementById('hidden_user').innerText;

  let body = {
    song_name: rowBoxes[3].innerHTML,
    artist_name: rowBoxes[4].innerHTML,
    audio_url: rowBoxes[6].innerHTML,
    album_image: rowBoxes[2].childNodes[0].getAttribute("src"),
    genre: rowBoxes[5].innerHTML,
    user_id: hidden_id
  }
  
  fetch('/songs', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      // 'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(json => {
      //all the song data is getting sent back in json.locals.users_song
      //add the song to user's collection
      console.log('this is the json: ', json);
      const art = body.album_image;
      const song = body.song_name;
      const artist = body.artist_name;
      const genre = body.genre;
      const sc_url = body.audio_url;

      const user_table = document.getElementsByClassName('grid')[0];
      const numRows = user_table.childNodes.length;
      const className = 'users' + numRows;
      const newRow = document.createElement('div');
      newRow.className = "row";
      newRow.innerHTML = createRowString(art, song, artist, genre, sc_url, className);
      user_table.appendChild(newRow);

      //this WILL allow for duplicates to be added to user collection

      //then will need to implement song router, controller, model for delete and send a delete message on the click of minus button
      // finally will need to load a sc player upon the play button
      // for each roe
    }).catch({

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