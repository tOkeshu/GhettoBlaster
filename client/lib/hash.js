define(function(require, exports, module) {
  function hex(buffer) {
    var codes = [];
    var view  = new Uint32Array(buffer);

    for (var i = 0; i < view.length; i += 1) {
      codes.push(view[i].toString(16));
    }

    return codes.join("");
  }

  function sha256(buffer, callback) {
    return crypto.subtle.digest("SHA-256", buffer)
      .then(function(hash) {
        callback(hex(hash));
      }).catch(console.error.bind(console));
  }

  return {
    sha256: sha256,
    hex: hex
  };
});
