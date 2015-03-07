/** @jsx React.DOM */

define(function(require, exports, module) {
  var AlbumModel = require("models/albums").Album;

  var stateTree = require("flux/state");
  var Dispatcher = require("flux/dispatcher");
  var dispatcherMixin = Dispatcher.mixin(stateTree);

  var Track = React.createClass({
    mixins: [dispatcherMixin],

    addToQueue: function() {
      this.actions.queue.add(this.props.track);
    },

    showNumber: function() {
      return this.props.track.track + " · ";
    },

    render: function() {
      return (
        <li className="track">
          <a href="#" onClick={this.addToQueue}>
            <p>{this.showNumber()}{this.props.track.title}</p>
          </a>
        </li>
      );
    }
  });

  var Album = React.createClass({
    mixins: [stateTree.mixin, dispatcherMixin],
    cursor: ['album'],

    statics: {
      title: "Album"
    },

    render: function() {
      var album = this.cursor.get();
      if (!album)
        return null;

      var className = React.addons.classSet({
        panel: true,
        current: this.props.active
      });

      var tracks = AlbumModel.getTracks(album.tracks, stateTree.get('tracks'));

      return (
        <section className={className} data-type="list" data-position="left">
          <ul>{
            tracks.map(function(track) {
              return <Track track={track} num={true}/>;
            }.bind(this))
          }</ul>
        </section>
      );
    }
  });

  var Albums = React.createClass({
    mixins: [stateTree.mixin],
    cursor: ["albums"],

    statics: {
      title: "Albums"
    },

    switchToAlbum: function(album) {
      console.log("switchToAlbum", album.name);
    },

    renderAlbum: function(album) {
      return (
        <li className="album">
          <a href="#" onClick={this.switchToAlbum.bind(this, album)}>
            <p>{album.name}</p>
          </a>
        </li>
      );
    },

    render: function() {
      var albums = this.cursor.get().toArray();
      var className = React.addons.classSet({
        panel: true,
        current: this.props.active
      });

      return (
        <section className={className} data-type="list" data-position="left">
          <ul>
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


