module("lib/file-list-reader", function(require) {
  function FileListReader(files) {
    this.files = files;
  }

  FileListReader.prototype = {
    filterBy: function(reg) {
      var files = [];
      for (var i = 0; i < this.files.length; i++) {
        files.push(this.files.item(i));
      }

      return files;
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
