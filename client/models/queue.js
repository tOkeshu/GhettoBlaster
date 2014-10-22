module("models/queue", function(require) {
  var TrackList = require("models/tracks").TrackList;

  function Queue() {
    TrackList.call(this);
    this.currentTrack = null;
  };

  Queue.prototype = new TrackList();
  Queue.prototype.constructor = Queue;

  Queue.prototype.previous = function() {
    var currentTrack;

    if (this.tracks.length === 0)
      return null;

    currentTrack = this.currentTrack - 1;
    if (currentTrack < 0) {
      currentTrack = 0;
    }

    this.currentTrack = currentTrack;
    return this.tracks[this.currentTrack];
  };

  Queue.prototype.next = function() {
    var currentTrack;

    if (this.tracks.length === 0)
      return null;

    if (this.currentTrack === null)
      currentTrack = 0;
    else
      currentTrack = this.currentTrack + 1;

    if (currentTrack >= this.tracks.length) {
      currentTrack = this.tracks.length;
    }

    this.currentTrack = currentTrack;
    return this.tracks[this.currentTrack];
  };

  Queue.prototype.setTrack = function(track) {
    var currentTrack = this.tracks.indexOf(track);
    if (currentTrack == -1)
      throw new Error("The track does not exist in the queue");

    this.currentTrack = currentTrack;
  };

  return Queue
});

