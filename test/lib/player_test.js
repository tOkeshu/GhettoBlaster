define([
  'require',
  'test/mocha',
  'lib/player'
], function(require, exports, module) {
  describe("Player", function() {
    var Player = require("lib/player");

    var sandbox, fakeTrack, anotherFakeTrack;

    beforeEach(function() {
      sandbox = sinon.sandbox.create();
      fakeTrack = {
        toFile: function() {
          return new Blob([new ArrayBuffer(10)], {type: "audio/mpeg"});
        }
      };
      anotherFakeTrack = {
        toFile: function() {
          return new Blob([new ArrayBuffer(20)], {type: "audio/mpeg"});
        }
      };
    });

    afterEach(function() {
      sandbox.restore();
    });

    describe("#play", function() {

      it("should change the current track", function() {
        var player = new Player();
        player.play(fakeTrack);
        expect(player.track).to.equal(fakeTrack);
      });

      it("should change the audio.src to an object url", function() {
        var player = new Player();
        player.play(fakeTrack);
        expect(player.audio.src).to.match(/blob:.+/);
      });

      it("should play audio", function() {
        var player = new Player();
        sandbox.stub(player.audio, "play");

        player.play(fakeTrack);

        expect(player.audio.play.calledOnce).to.equal(true);
      });

      it("should be playing", function() {
        var player = new Player();

        player.play(fakeTrack);

        expect(player.playing).to.equal(true);
      });

      it("should play the current track if noone is given", function() {
        var player = new Player();
        player.track = fakeTrack;
        sandbox.stub(player.audio, "play");

        expect(function() {
          player.play();
        }).to.not.throwException();
        expect(player.audio.play.calledOnce).to.equal(true);
      });

      it("should emit a playing event", function(done) {
        var player = new Player();
        player.on("play", function() {
          done();
        });

        player.play(fakeTrack);
      });

      it("should emit a track:change event if the track to play is different " +
         "than the current one", function(done) {
           var player = new Player();

           player.play(fakeTrack);
           player.on("track:change", function() {
             done();
           });

           player.play(anotherFakeTrack);
         });
    });

    describe("#pause", function() {

      it("should pause audio", function() {
        var player = new Player();
        player.play(fakeTrack);
        sandbox.stub(player.audio, "pause");

        player.pause();

        expect(player.audio.pause.calledOnce).to.equal(true);
      });

      it("should not be playing", function() {
        var player = new Player();
        player.play(fakeTrack);

        player.pause();

        expect(player.playing).to.equal(false);
      });

      it("should emit a pause event", function(done) {
        var player = new Player();
        player.play(fakeTrack);
        player.on("pause", function() {
          done();
        });

        player.pause();
      });
    });

    describe("#stop", function() {

      it("should remove the audio src attribute", function() {
        var player = new Player();
        player.play(fakeTrack);

        player.stop();

        expect(player.audio.src).to.equal('');
      });

      it("should not be playing", function() {
        var player = new Player();
        player.play(fakeTrack);

        player.stop();

        expect(player.playing).to.equal(false);
      });

      it("should emit a pause event", function(done) {
        var player = new Player();
        player.play(fakeTrack);
        player.on("stop", function() {
          done();
        });

        player.stop();
      });

    });

    describe("events", function() {

      it("should emit a track:end event when the audio ended", function(done) {
        var createElement = document.createElement;
        var listeners = {};
        var fakeAudio = {
          addEventListener: function(event, callback) {
            listeners[event] = callback;
          },

          trigger: function(event) {
            listeners[event]();
          }
        };
        var player;

        sandbox.stub(document, "createElement", function(name) {
          if (name == "audio")
            return fakeAudio;
          return createElement.apply(document, arguments);
        });
        player = new Player();
        player.on("track:end", function() {
          done();
        });

        player.audio.trigger("ended");
      });

      it("should emit a track:progress event when the audio plays",
         function(done) {
           var createElement = document.createElement;
           var listeners = {};
           var fakeAudio = {
             addEventListener: function(event, callback) {
               listeners[event] = callback;
             },

             trigger: function(event) {
               var args = Array.prototype.slice.call(arguments);
               args = args.slice(1); // remove the first argument
               var listener = listeners[event];
               listener.apply(listener, args);
             },

             duration: 200,
             currentTime: 10
           };
           var player, event;

           sandbox.stub(document, "createElement", function(name) {
             if (name == "audio")
               return fakeAudio;
             return createElement.apply(document, arguments);
           });
           player = new Player();
           player.on("track:progress", function(progress) {
             // progress is a percentage here
             expect(progress).to.equal(5);
             done();
           });

           event = {target: fakeAudio};
           player.audio.trigger("timeupdate", event);
         });

    });
  });
});

