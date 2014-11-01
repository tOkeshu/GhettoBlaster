(function() {
  require.config({
    baseUrl: "/"
  });

  require([
    'lib/player',
    'models/tracks',
    'models/queue',
    'views/app'
  ], function() {
    var Player    = require("lib/player");
    var App       = require("views/app");
    var TrackList = require("models/tracks").TrackList;
    var Queue     = require("models/queue");

    var deps = {
      player: new Player(),
      queue:  new Queue(),
      tracks: new TrackList()
    };
    React.renderComponent(App(deps), document.querySelector('body'));
  });
}());

