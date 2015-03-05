define(function(require, exports, module) {
  var uuid = require("lib/uuid");

  function Artist(options) {
    this.id     = options.id || options._id;
    this._id    = options.id || options._id;
    this.name   = options.name;
    this.albums = [];
  }

  Artist.id = uuid;

  Artist.prototype = {
  };

  return {
    Artist: Artist
  };
});
