/** @jsx React.DOM */

define(function(require, exports, module) {
  var stateTree = require("flux/state");
  var Dispatcher = require("flux/dispatcher");
  var dispatcherMixin = Dispatcher.mixin(stateTree);

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
    Albums: Albums
  };
});


