console.log('main js is connected!');

function createRowString(artwork_url, song_name, artist_name, genre, sc_url, class_name) {
  return `
    <div class='box'>
      <button class='delete ${class_name}'>
        <i class="fa fa-minus" aria-hidden="true"></i>
      </button>
      <button class='play ${class_name}'>
        <i class="fa fa-plus" aria-hidden="true"></i>
      </button>
    </div>
    <div class='box ${class_name}'><img class='art_small' src="${artwork_url}"></div>
    <div class='box ${class_name}'>${song_name}</div>
    <div class='box ${class_name}'>${artist_name}</div>
    <div class='box ${class_name}'>${genre}</div>
    <div class='${class_name}' style="display: none">${sc_url}</div>
  `;
}

function putRowIntoCollection(rowName) {
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
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(json => {
      //all the song data is getting sent back in json.locals.users_song
      //add the song to user's collection
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

      grabDeleteButtons();
      grabPlayButtons();
      //this WILL allow for duplicates to be added to user collection
    }).catch(error => {
      //handle error
    })
}

function grabRowButtons() {
  const addButtons = document.querySelectorAll('.add');
  for(let addButton of addButtons) {
    addButton.addEventListener('click', () => {
      return putRowIntoCollection(addButton.classList[1])
    })
  }
}

function deleteRowFromCollection(rowName) {
  const rowBoxes = document.getElementsByClassName(`${rowName}`);  
  let hidden_id = document.getElementById('hidden_user').innerText;
  let body = {
    song_name: rowBoxes[3].innerHTML,
    user_id: hidden_id
  }
  
  let box = rowBoxes[0].parentNode;
  let row = box.parentNode;
  row.parentNode.removeChild(row);

  fetch('/songs', {
    method: 'DELETE',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(json => {
      //handle error
    })
}

function grabDeleteButtons() {
  const deleteButtons = document.querySelectorAll('.delete');
  for(let deleteButton of deleteButtons) {
    deleteButton.addEventListener('click', () => {
      return deleteRowFromCollection(deleteButton.classList[1]);
    })
  }
}

function loadSoundcloudWidget(rowName) {
  const rowBoxes = document.getElementsByClassName(`${rowName}`);
  const uri = rowBoxes[6].innerHTML;
  const holder = document.getElementById('soundcloud_holder');
  let currentWidget = document.getElementById('sc_widget');

   //check if there is already a widget there and delete it if it is
  if (currentWidget != null) {
    holder.removeChild(currentWidget);
  }

  //create widget based on soundcloud specs
  let widget = document.createElement('iframe');
  widget.setAttribute('width', '70%');
  widget.setAttribute('height', '166');
  widget.setAttribute('scrolling', 'no');
  widget.setAttribute('frameborder', 'no');
  widget.setAttribute('id', 'sc_widget');

  const song_source = 'https://w.soundcloud.com/player/?url=' + uri + '&amp;color=0066cc';
  widget.setAttribute('src', song_source);
  
  holder.appendChild(widget);
}

function grabPlayButtons() {
  const playButtons = document.querySelectorAll('.play');
  for(let playButton of playButtons) {
    playButton.addEventListener('click', () => {
      return loadSoundcloudWidget(playButton.classList[1]);
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  grabRowButtons();
  grabDeleteButtons();
  grabPlayButtons();
});