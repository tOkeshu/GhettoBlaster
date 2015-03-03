define(function(require, exports, module) {
  var Track          = require("models/tracks").Track;
  var FileListReader = require("lib/file-list-reader");

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

      reader.filter(files).by('audio/mpeg').forEach(function(file) {
        reader.read(file, function(blob, hash) {
          var track = new Track(blob, hash);
          tracks.edit(tracks.get().add(track));
        }.bind(this));
      }.bind(this));
    }
  };

  return Dispatcher;
});
