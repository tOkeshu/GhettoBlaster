define(function(require, exports, module) {
  var hex = require("lib/hash").hex;

  function uuid() {
    var size = 32 / 8;
    return hex(crypto.getRandomValues(new Uint8Array(size)));
  }

  return uuid;
});
