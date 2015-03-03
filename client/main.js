(function() {
  require.config({
    baseUrl: "/"
  });

  require([
    'lib/player',
    'views/app'
  ], function() {
    var Player = require("lib/player");
    var App    = require("views/app");
    React.renderComponent(App({player: new Player()}), document.querySelector('body'));
  });
}());

