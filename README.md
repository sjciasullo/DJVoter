# DJVoter
DJ selects the options, the people decide the song

# User Story
A DJ, DJ_Ceddy_Ced, wants to play his music and have listener involvement. 
He uses his favorite web app, **DJVoter**, to get in touch with his followers. 

## Login
He can login to his profile, which shows him the songs he has added in order from 
most to least voted. He can also see a list of songs from his favorited songs on his jamendo (checkout his jamendo https://jamendo.com/cedric_lee). 

## Select Song
Ceddy_ced creates a room where his friends can go listen to the music he chooses for 
them. They then vote .

## Voting Process
Listeners have been waiting for Ced to come on the scene, and his song is voted as
next up! His song goes comes on and he earns lots of points. 

## Logout
He logs out because he's a super cool guy and has other stuff to do but 
the songs go on.

# Tech
- HTML / EJS
- Node.js and Express.js
- MVC Pattern
- SQL via PG-PROMISE
- Authentication
  - passport, passport-local, bcryptjs
- Socket.io 
- jamendo API
  - Get user favorites
  - stream song
  - search for song

# Process
## Database
### users
- id
- name
- email
- password_digest
### songs
- id
- song_name // if song name exists then just add to user's songs
- artist_name
- sc_address
- times_played
- length
### users_songs
- id
- song_id
- artist_id
### db for rooms
- id of the room 
- name of the room for socket.io
- name of the creator / creator id

## Wireframes
### Menu-> djLogin
[Menu-> djLogin](./assets/wireframes/main>djlogin.JPG)
[Menu-> djLogin](./assets/wireframes/main>djlogin+register.JPG)
### Login>profile
[login-> profile](./assets/wireframes/djlogin>profile2.JPG)
### Menu-> rooms
[Menu-> rooms](./assets/wireframes/main>rooms.JPG)
### rooms-> player
[Menu-> djLogin](./assets/wireframes/rooms>player.JPG)

## Views
### partials
   - boiler
   - end
   - header: 
      - disc icon for back to home as well
      - menu button: Home / Rooms / Regist / (login / logout / profile) 
   - table: will fill with rows and columns, is this flexible to rooms
   - voter radio form


### index

### rooms
#### room-index
#### room-show

### auth
#### auth/login 
#### auth/register

### user
#### user
#### user-edit
#### user-room




## Workflow
1. ~~check setup~~
   ~~1. setup server~~
   ~~2. check soundcloud fetching and api~~
   ~~3. setup db~~
2. mvp
   1. ~~there is a song bank~~ that will stream songs into a player
   2. anyone can choose a song up to 5 songs chosen and their song
   3. users on the page can vote
   4. highest voted song plays when current song ends or someone hits the next button
3. auth
   1. ~~dj's can register and login~~ 
      1. ~~directed to a user page which shows their songs and their favoritesfrom soundcloud~~
      2. link to create a room?
      3. ~~at the user page they can edit their collection via
      songs from soundcloud -> their favorites~~ or can search or can view their
      playlists?
4. views
   1. ~~index -> djLogin which has register and sign in~~
   2. drop down of current scenes
   3. scene view
      1. listener view has header, current song and then a radio form of song to vote for
      2. needs a bunch of javascript... submit vote button
      3. something that holds all of the next_song options and their number of votes
      4. dj view
         1. their collection on the right in a scrollable box
         2. they have a click-able screen where their library pulls up from the right
         3. end room button 
   4. get player working with starter songs
   5. socket.io
      1. multiple instances of rooms. each initiated by a dj
      2. upon creation the room will be added to db
      3. dj has to end room 
      4. if dj is not present then pick a random song from 

## To-Do urgent
1. function of delete button -> deletes from users_songs
2. play button plays songs -- oembed sc player
3. setup room view
   1. have a submit vote button
   2. song options
   3. player area... potentially with speakers on either side
   4. hidden song bank that can be clicked / viewed only with user
   5. upon submit vote button, show the votes underneat the player area
4. setup list of rooms view (maybe)
5. stylizing
   1. header -> different for dj, has logout, user button
      1. otherwise has home, about, rooms, login
      2. logo in top left
   2. color scheme -> black and red? check color picker
   3. font picker
   4. pull down menu for header
   5. pull left song_bank for user
   6. 
6. socket.io
   1. create a room that user can socket into
   2. dj can add 3-5 songs into the radio buttons
      1. separate out main.js into main and room
      2. have a submit vote button
   3. multiple instances of a room -> need to add db for this
7. about page

