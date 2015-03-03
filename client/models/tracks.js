define(function(require, exports, module) {
  var ID3 = require("lib/id3");

  function Track(blob, hash) {
    // XXX: Parse tags outside of the constructor
    var parser = new ID3.ID3v2Parser();
    // XXX: ID3v2Parser#parse should accepts any kind of typed array
    // instead of expecting a Uint8Array;
    tags = parser.parse(new Uint8Array(blob));

    this.title  = tags.title;
    this.album  = tags.album;
    this.artist = tags.artist;
    this.data   = blob;
    this.hash   = hash;
  }

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
