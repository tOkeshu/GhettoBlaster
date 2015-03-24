define(["flux/db"], function(db) {
  var migrations = {
    migrate: function(doc, Model) {
      var ids =
        Object.keys(migrations[Model.name]).sort().filter(function(id) {
          return parseInt(id, 10) > (doc.version || 0);
        });
      var id = ids.shift();

      return ids.reduce(function(prevMigration, id) {
        var migration = migrations[Model.name][id];

        if (!(prevMigration instanceof Promise))
          prevMigration = Promise.resolve(prevMigration);

        return prevMigration.then(function(doc) {
          return migration(doc);
        });
      }, migrations[Model.name][id](doc));
    },

    'Track': {
      '201503232102': function(doc) {
        var parser = new ID3.ID3v2Parser();
        // XXX: ID3v2Parser#parse should accepts any kind of typed array
        // instead of expecting a Uint8Array;
        var tags = parser.parse(new Uint8Array(doc.data));

        doc.title   = tags.title;
        doc.album   = tags.album;
        doc.artist  = tags.artist;
        doc.track   = tags.track;
        doc.version = 201503232102;

        return doc;
      }
    },

    'Album': {
      '201503232326': function(doc) {
        var trackId;
        if (doc.tracks.length === 0)
          return doc;

        trackId = doc.tracks[0];

        return db.tracks.get(trackId).then(function(track) {
          var parser = new ID3.ID3v2Parser();
          // XXX: ID3v2Parser#parse should accepts any kind of typed array
          // instead of expecting a Uint8Array;
          var tags = parser.parse(new Uint8Array(track.data));

          doc.name    = tags.album;
          doc.artist  = tags.artist;
          doc.version = 201503232326;

          return doc;
        });
      }
    }
  };

  return migrations;
});
