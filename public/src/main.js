console.log('main js is connected!');

function putRowIntoCollection(rowNumber){
  const rowBoxes = document.getElementsByClassName(`.${rowNumber}`);
  //row numbers are the instance of .rowNumber
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
        //delete song from 
        //add the song to user's collection
        //this may allow for duplicates to be added to user collection
        //still need to implement song router, controller, model for post
        //then will need to implement song router, controller, model for delete and send a delete message on the click of minus button
        // finally will need to load a sc player upon the play button
        // for each row
      }
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