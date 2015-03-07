define(function(require, exports, module) {
  var Track = require("models/tracks").Track;
  var Album = require("models/albums").Album;

  var stateTree = require("flux/state");

  var db = {
    artists: new PouchDB('artists'),
    albums:  new PouchDB('albums'),
    tracks:  new PouchDB('tracks')
  };

  Promise.all([
    db.tracks.allDocs({include_docs: true}),
    db.albums.allDocs({include_docs: true})
  ]).then(function(results) {
    var tracks = results[0].rows.map(function(row) {
      return new Track(row.doc);
    });
    var albums = results[1].rows.map(function(row) {
      return new Album(row.doc);
    });

    return Promise.all([
      stateTree.set('tracks',  Immutable.Set(tracks)),
      stateTree.set('albums',  Immutable.Set(albums))
    ]);
  }).then(function() {
    var onChange = function(key, constructor) {
      return function(change) {
        var set = stateTree.get(key);

        if (change.deleted) {
          // change.id holds the deleted id
        } else { // updated/inserted
          stateTree.set(key, set.add(new constructor(change.doc)));
        }
      };
    };

    var options = {live: true, since: 'now', include_docs: true};
    var error = console.error.bind(console);

    db.tracks.changes(options)
      .on('change', onChange("tracks", Track)).on('error', error);
    db.albums.changes(options)
      .on('change', onChange("albums", Album)).on('error', error);
  });

  window.dropdb = function() {
    Promise.all([
      db.artists.destroy(),
      db.albums.destroy(),
      db.tracks.destroy()
    ]).then(function() {
      console.log("done");
    }).catch(console.error.bind(console));
  };

  return db;
});
