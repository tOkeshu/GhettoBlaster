/** @jsx React.DOM */

define(function(require, exports, module) {
  var AlbumModel = require("models/albums").Album;

  var stateTree = require("flux/state");
  var Dispatcher = require("flux/dispatcher");
  var dispatcherMixin = Dispatcher.mixin(stateTree);

  var Header = require("views/commons").Header;
  var Importer = require("views/commons").Importer;

  var Track = React.createClass({
    mixins: [dispatcherMixin],

    addToQueue: function() {
      this.actions.queue.add(this.props.track);
    },

    render: function() {
      var track = this.props.track;

      return (
        <li className="track">
          <a href="#" onClick={this.addToQueue}>
            <p>{`${track.track} · ${track.title}`}</p>
          </a>
        </li>
      );
    }
  });

  var Album = React.createClass({
    mixins: [stateTree.mixin, dispatcherMixin],
    cursors: {
      panel: ['panel'],
      album: ['album']
    },

    statics: {
      title: "Album"
    },

    addToQueue: function() {
      var album  = this.cursors.album.get();
      var tracks = AlbumModel.getTracks(album.tracks, stateTree.get('tracks'));
      this.actions.queue.add(tracks);
    },

    render: function() {
      var album  = this.cursors.album.get();
      var active = this.cursors.panel.get() === 'album';

      if (!album)
        return null;

      var className = React.addons.classSet({
        panel: true,
        active: active
      });

      var tracks = AlbumModel.getTracks(album.tracks, stateTree.get('tracks'));

      return (
        <section className={className}>
          <Header title="Album"/>
          <ul className="content">
            <li className="album-tracks">
              <a href="#" onClick={this.addToQueue}>
                <p>{album.name}</p>
                <p>{`${tracks.length} tracks`}</p>
              </a>
            </li>
            {
              tracks.map(function(track) {
                return <Track track={track}/>;
              }.bind(this))
            }
          </ul>
        </section>
      );
    }
  });

  var Albums = React.createClass({
    mixins: [stateTree.mixin, dispatcherMixin],
    cursors: {
      panel:  ["panel"],
      albums: ["albums"]
    },

    statics: {
      title: "Albums"
    },

    switchToAlbum: function(album, event) {
      event.preventDefault();
      this.actions.switchToAlbum(album);
    },

    renderAlbum: function(album) {
      return (
        <li className="album">
          <a href="#" onClick={this.switchToAlbum.bind(this, album)}>
            <p>{album.name}</p>
            <p>{album.artist}</p>
          </a>
        </li>
      );
    },

    render: function() {
      var albums = this.cursors.albums.get().toArray();
      var active = this.cursors.panel.get() === 'albums';

      var className = React.addons.classSet({
        panel: true,
        active: active
      });

      return (
        <section className={className}>
          <Header title="Albums"/>
          <ul className="content">
            <Importer/>
            {albums.map(this.renderAlbum)}
          </ul>
        </section>
      );
    }
  });

  return {
    Album: Album,
    Albums: Albums
  };
});


