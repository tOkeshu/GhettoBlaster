define(function(require, exports, module) {
  var Track          = require("models/tracks").Track;
  var Album          = require("models/albums").Album;
  var Artist         = require("models/artists").Artist;
  var FileListReader = require("lib/file-list-reader");
  var db             = require("flux/db");

  function PlayerDispatcher(initialState) {
    this.state  = initialState;
    this.player = this.state.select('player');
    this.queue  = this.state.select('queue');

    this.audio = document.createElement("audio");
    this.audio.addEventListener("ended", this._onTrackEnded.bind(this));
    this.audio.addEventListener("timeupdate", this._onProgress.bind(this));
  }

  PlayerDispatcher.prototype = {
    play: function(index) {
      var track;

      if (index !== undefined && index !== this.queue.get('index')) {
        track = this.queue.get('tracks').get(index);
        this.player.set('track', track);
        this.queue.set('index', index);
        this.audio.src = URL.createObjectURL(track.toFile());
      }

      this.audio.play();
      this.player.set('playing', true);
    },

    pause: function() {
      this.audio.pause();
      this.player.set('playing', false);
    },

    previous: function() {
      var queue = this.queue.get();

      if (queue.tracks.size === 0)
        return;

      if (queue.index === 0)
        return;

      if (queue.index === null) {
        this.play(0);
      } else {
        this.play(queue.index - 1);
      }
    },

    next: function() {
      var queue = this.queue.get();
      var index, track;

      if (queue.tracks.size === 0)
        return;

      if (queue.index === (queue.tracks.size - 1))
        return;

      if (queue.index === null) {
        this.play(0);
      } else {
        this.play(queue.index + 1);
      }
    },

    _onProgress: function(event) {
      var progress = event.target.currentTime * 100 / this.audio.duration;
      this.player.set('progress', progress);
    },

    _onTrackEnded: function() {
      var queue = this.queue.get();

      if (queue.index === (queue.tracks.size - 1)) {
        this.player.set('playing', false);
        this.player.set('track', null);
        this.queue.set('index', null);
        return;
      }

      this.next();
    }
  };

  function QueueDispatcher(initialState) {
    this.state = initialState;
  }

  QueueDispatcher.prototype = {
    add: function(track) {
      var tracks = this.state.select('queue', 'tracks');
      tracks.edit(tracks.get().push(track));
    }
  };

  function Dispatcher(initialState) {
    this.state  = initialState;
    this.player = new PlayerDispatcher(initialState);
    this.queue  = new QueueDispatcher(initialState);
  }

  Dispatcher.mixin = function(initialState) {
    return {actions: new Dispatcher(initialState)};
  };

  Dispatcher.prototype = {
    importFiles: function(files) {
      var tracks = this.state.select('tracks');
      var reader = new FileListReader();
      var files  = files;

      Promise.all(reader.filter(files).by('audio/mpeg').map(function(file) {
        return reader.read(file, function(blob, hash) {
          var parser = new ID3.ID3v2Parser();
          // XXX: ID3v2Parser#parse should accepts any kind of typed array
          // instead of expecting a Uint8Array;
          var tags = parser.parse(new Uint8Array(blob));

          return new Track({
            id:     Track.id(),
            title:  tags.title,
            album:  tags.album,
            artist: tags.artist,
            track:  tags.track,
            data:   blob,
            hash:   hash
          });
        }.bind(this));
      }.bind(this)))
      // create all albums
        .then(function(tracks) {
          var library = {
            artists: [],
            albums: [],
            tracks: tracks
          };

          library.albums = tracks.reduce(function(albums, track) {
            var album = albums.get(track.album) || new Album({
              id: Album.id(),
              name: track.album,
              artist: track.artist
            });

            album.tracks.push(track.id);

            return albums.set(track.album, album);
          }, Immutable.Map()).toArray();

          return library;
        })
        .then(function(library) {
          var tracks  = library.tracks;
          var albums  = library.albums;

          tracks = tracks.reduce(function(tracks, track) {
            tracks[track.id] = track;
            return tracks;
          }, {});

          albums.forEach(function(album) {
            album.tracks.forEach(function(trackId) {
              var track = tracks[trackId];
              track.albumId  = album.id;
            });
          });

          return library;
        })
        .then(function(library) {
          return Promise.all([
            db.artists.bulkDocs(library.artists),
            db.albums.bulkDocs(library.albums),
            db.tracks.bulkDocs(library.tracks)
          ]);
        });
    },

    togglePanel: function() {
      var panel = this.state.get('panel');

      if (panel === "albums")
        this.state.set('panel', "tracks");
      if (panel === "tracks")
        this.state.set('panel', "queue");
      if (panel === "queue")
        this.state.set('panel', "albums");

      if (panel === "album")
        this.state.set('panel', "queue");

      this.state.commit();
    },

    switchToAlbum: function(album) {
      this.state.set('album',  album);
      this.state.set('panel', 'album');
    },

    switchToQueue: function() {
      this.state.set('panel', 'queue');
    }
  };

  return Dispatcher;
});
