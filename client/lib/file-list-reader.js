define(function(require, exports, module) {
  var sha256 = require("lib/hash.js").sha256;

  function FileListReader() {
  }

  FileListReader.prototype = {
    filter: function(files) {
      var toFilter = [];

      for (var i = 0; i < files.length; i++)
        toFilter.push(files[i]);

      return {
        by: function(reg) {
          return toFilter.filter(function(file) {
            return file.type.match(reg);
          });
        }
      };
    },

    read: function(file, callback) {
      return new Promise(function(resolve, reject) {
        var reader = new FileReader();

        reader.onload = function(event) {
          var blob = event.target.result;
          sha256(blob, function(hash) {
            resolve(callback(blob, hash));
          });
        };
        reader.readAsArrayBuffer(file);
      });
    }
  };

  return FileListReader;
});
