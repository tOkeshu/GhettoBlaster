define([
  'require',
  'test/mocha',
  'lib/file-list-reader',
], function(require, exports, module) {

  describe("FileListReader", function() {
    var FileListReader = require("lib/file-list-reader");

    describe("#filter", function() {

      describe(".by", function() {

        it("should return an array filtered by the regexp", function() {
          var reader = new FileListReader();
          var files = [
            new File(['some data'], 'a', {type: 'audio/mpeg'}),
            new File(['more data'], 'b', {type: 'text/plain'})
          ];

          expect(reader.filter(files).by(/audio\/mpeg/)).to.eql([files[0]]);
        });

      });

    });

    describe("#read", function() {

      it("should call the callback with an ArrayBuffer", function(done) {
        var file = new File(['some data'], 'a file', {type: 'text/plain'});
        var reader = new FileListReader();

        reader.read(file, function(blob) {
          var text = new TextDecoder('utf-8').decode(new Uint8Array(blob));
          expect(text).to.equal('some data');
          done();
        });
      });

    });

  });
});

