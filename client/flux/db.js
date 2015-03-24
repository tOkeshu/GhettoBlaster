define(['models/tracks', 'models/albums'], function() {
  var Track = require("models/tracks").Track;
  var Album = require("models/albums").Album;

  var stateTree = require("flux/state");

  var db = {
    artists: new PouchDB('artists'),
    albums:  new PouchDB('albums'),
    tracks:  new PouchDB('tracks')
  };

  function migrate(doc, Model) {
    return new Promise(function(resolve) {
      require(["flux/migrations"], resolve);
    }).then(function(migrations) {
      return migrations.migrate(doc, Model);
    });
  }

  db.tracks.allDocs({include_docs: true}).then(function(results) {
    return Promise.all(results.rows.map(function(row) {
      var doc = row.doc;

      if (doc.version < Track.version) {
        return migrate(doc, Track).then(function(doc) {
          return db.tracks.put(doc).then(function() {
            return doc;
          });
        }).then(function(doc) {
          return new Track(doc);
        });
      }

      return new Track(doc);
    }));
  }).then(function(tracks) {
    stateTree.set('tracks',  Immutable.Set(tracks));
  });

  db.albums.allDocs({include_docs: true}).then(function(results) {
    return Promise.all(results.rows.map(function(row) {
      var doc = row.doc;

      if (doc.version < Album.version) {
        return migrate(doc, Album).then(function(doc) {
          return db.albums.put(doc).then(function() {
            return doc;
          });
        }).then(function(doc) {
          return new Album(doc);
        });
      }

      return new Album(doc);
    }));
  }).then(function(albums) {
    stateTree.set('albums',  Immutable.Set(albums));
  });

  (function listenForChanges() {
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
  }());

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
