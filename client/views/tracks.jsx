/** @jsx React.DOM */

define(function(require, exports, module) {
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
            <p>{track.title}</p>
            <p>{track.album}</p>
          </a>
        </li>
      );
    }
  });

  var TrackList = React.createClass({
    mixins: [stateTree.mixin],
    cursors: {
      panel:  ["panel"],
      tracks: ["tracks"]
    },

    statics : {
      title: "Tracks"
    },

    togglePanel: function() {
      this.actions.togglePanel();
    },

    render: function() {
      var tracks = this.cursors.tracks.get().toArray();
      var active = this.cursors.panel.get() === 'tracks';

      var className = React.addons.classSet({
        panel: true,
        active: active
      });

      return (
        <section className={className}>
          <Header title="Tracks"/>
          <ul className="content">
            <Importer/>
            {tracks.map(function(track) {
              return <Track track={track}/>;
            }.bind(this))}
          </ul>
        </section>
      );
    }
  });

  return {
    Track: Track,
    TrackList: TrackList
  };
});


