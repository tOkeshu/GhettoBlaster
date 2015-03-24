define(function(require, exports, module) {
  var uuid = require("lib/uuid");

  function Album(options) {
    this.id      = options.id || options._id;
    this._id     = options.id || options._id;
    this.name    = options.name;
    this.artist  = options.artist;
    this.tracks  = options.tracks || [];
    this.version = options.version;

    this.artistId = options.artistId || null;
  }

  Album.id = uuid;
  Album.getTracks = function(ids, tracks) {
    ids = Immutable.Set(ids);
    return tracks.filter(function(track) {
      return ids.has(track.id);
    }).sort(function(trackA, trackB) {
      return trackA.track > trackB.track;
    }).toArray();
  };
  Album.version = 201503232326;

  Album.prototype = {
  };

  return {
    Album: Album
  };
});
