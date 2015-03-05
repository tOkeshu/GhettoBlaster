define(function(require, exports, module) {
  var uuid = require("lib/uuid");

  function Track(options) {
    this.id     = options.id || options._id;
    this._id    = options.id || options._id;
    this.title  = options.title;
    this.album  = options.album;
    this.artist = options.artist;
    this.data   = options.data;
    this.hash   = options.hash;

    this.artistId = options.artistId || null;
    this.albumId  = options.albumId  || null;
  }

  Track.id = uuid;

  Track.prototype = {
    toFile: function() {
      return new Blob([this.data], {type: "audio/mpeg"});
    },

    hashCode: function() {
      return parseInt(this.hash.slice(this.hash.length - 8), 16);
    },

    equals: function(other) {
      return this.hash === other.hash;
    }
  };

  return  {
    Track: Track,
  }
});
