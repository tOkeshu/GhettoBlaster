(function() {
  var testFiles = [
    'test/lib/player_test'
  ];

  require.config({
    baseUrl: "/",
    shim: {
      'test/mocha': {
        init: function () {
          this.mocha.setup('bdd');
          return this.mocha;
        }
      }
    }
  });

  require(['test/mocha'].concat(testFiles), function(mocha) {
    mocha.checkLeaks();
    mocha.run();
  });
}());

