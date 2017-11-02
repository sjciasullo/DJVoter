ALTER TABLE songs DROP CONSTRAINT songs_song_name_key;

ALTER TABLE songs ADD CONSTRAINT unique_uri UNIQUE (uri);
