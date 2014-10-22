module("lib/player", function(require) {
  var MicroEvent = require("lib/microevent");

  function Player() {
    this.track   = null;
    this.playing = false;
    this.audio   = document.createElement("audio");
    this.audio.addEventListener("ended", this._onTrackEnded.bind(this));
  }

  Player.prototype = {
    play: function(track) {
      if (track && track !== this.track) {
        this.audio.src = URL.createObjectURL(track.toFile());
        this.track = track;
        this.emit("track:change", track);
      }

      this.audio.play();
      this.playing = true;
      this.emit("playing");
    },

    pause: function() {
      this.audio.pause();
      this.playing = false;
      this.emit("pause");
    },

    stop: function() {
      this.audio.removeAttribute("src");
      this.playing = false;
      this.emit("stopped");
    },

    _onTrackEnded: function() {
      this.emit("track:end");
    }
  };

  MicroEvent.mixin(Player);

  return Player;
});
