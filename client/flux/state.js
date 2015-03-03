define(function(require, exports, module) {
  // var Immutable = require("vendor/immutable");
  // var Baobab = require("vendor/baobab");

  var stateTree = new Baobab({
    tracks: Immutable.Set(),
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

  stateTree.on('update', function() {
    // console.log("here", stateTree.get());
  });


  return stateTree;
});
