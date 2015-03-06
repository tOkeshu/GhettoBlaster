define(function(require, exports, module) {
  // var Immutable = require("vendor/immutable");
  // var Baobab = require("vendor/baobab");

  var stateTree = new Baobab({
    panel: 'albums',
    tracks: Immutable.Set(),
    albums: Immutable.Set(),
    queue: {
      index:  null,
      tracks: Immutable.List()
    },
    player: {
      playing: false,
      track: null,
      progress: 0
    }
  });

  return stateTree;
});
