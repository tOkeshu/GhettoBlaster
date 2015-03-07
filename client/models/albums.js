define(function(require, exports, module) {
  var uuid = require("lib/uuid");

  function Album(options) {
    this.id     = options.id || options._id;
    this._id    = options.id || options._id;
    this.name   = options.name;
    this.artist = options.artist;
    this.tracks = options.tracks || [];

    this.artistId = options.artistId || null;
  }

  Album.id = uuid;

  Album.prototype = {
  };

  return {
    Album: Album
  };
});
