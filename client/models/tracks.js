module("models/tracks", function(require) {
  var ID3 = require("lib/id3");

  function Track(blob) {
    var parser = new ID3.ID3v2Parser();
    // XXX: ID3v2Parser#parse should accepts any kind of typed array
    // instead of expecting a Uint8Array;
    tags = parser.parse(new Uint8Array(blob));

    this.title  = tags.title;
    this.album  = tags.album;
    this.artist = tags.artist;
    this.data   = blob;
  }

  Track.prototype = {
    toFile: function() {
      return new Blob([this.data], {type: "audio/mpeg"});
    }
  };

  function TrackList() {
    this.tracks = [];
  }

  TrackList.prototype = {
    add: function(track) {
      this.tracks.push(track);
      this.emit("add", track);
      return this;
    },

    map: function() {
      return this.tracks.map.apply(this.tracks, arguments);
    },

    slice: function() {
      return this.tracks.slice.apply(this.tracks, arguments);
    }
  };

  MicroEvent.mixin(TrackList);

  return  {
    Track: Track,
    TrackList: TrackList
  }
});
