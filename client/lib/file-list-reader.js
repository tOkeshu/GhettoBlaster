define(function(require, exports, module) {
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
      var reader = new FileReader();

      reader.onload = function(event) {
        callback(event.target.result)
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return FileListReader;
});
