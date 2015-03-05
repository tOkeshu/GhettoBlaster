define(function(require, exports, module) {
  var Track = require("models/tracks").Track;
  var stateTree = require("flux/state");

  var db = {
    artists: new PouchDB('artists'),
    albums:  new PouchDB('albums'),
    tracks:  new PouchDB('tracks')
  };

  Promise.all([
    db.tracks.allDocs({include_docs: true})
  ]).then(function(results) {
    var tracks = results[0].rows.map(function(row) {
      return new Track(row.doc);
    });

    return Promise.all([
      stateTree.set('tracks',  Immutable.Set(tracks))
    ]);
  }).then(function() {
    var onChange = function(change) {
      var tracks = stateTree.get('tracks');

      if (change.deleted) {
        // change.id holds the deleted id
      } else { // updated/inserted
        stateTree.set('tracks', tracks.add(new Track(change.doc)));
      }
    }
    var options = {live: true, since: 'now', include_docs: true};
    var error = console.error.bind(console);

    return Promise.all([
      db.tracks.changes(options).on('change', onChange).on('error', error)
    ]);
  });

  return db;
});
