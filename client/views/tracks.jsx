/** @jsx React.DOM */

define(function(require, exports, module) {
  var stateTree = require("flux/state");
  var Dispatcher = require("flux/dispatcher");
  var dispatcherMixin = Dispatcher.mixin(stateTree);

  var Importer = React.createClass({
    mixins: [dispatcherMixin],

    onFiles: function(event) {
      this.actions.importFiles(event.target.files);
    },

    selectFile: function(event) {
      event.preventDefault();
      this.getDOMNode().querySelector("input[type=file]").click();
    },

    render: function() {
      return (
        <li className="importer">
          <input type="file" multiple style={{display: "none"}} onChange={this.onFiles}/>
          <a href="#" onClick={this.selectFile}>
            <p>Import Tracks</p>
          </a>
        </li>
      );
    }
  });

  var Track = React.createClass({
    mixins: [dispatcherMixin],

    addToQueue: function() {
      this.actions.queue.add(this.props.track);
    },

    render: function() {
      return (
        <li className="track">
          <a href="#" onClick={this.addToQueue}>
            <p>{this.props.track.title}</p>
          </a>
        </li>
      );
    }
  });

  var TrackList = React.createClass({
    mixins: [stateTree.mixin],
    cursor: ["tracks"],

    statics : {
      title: "Tracks"
    },

    render: function() {
      var tracks = this.cursor.get().toArray();
      var className = React.addons.classSet({
        panel: true,
        current: this.props.active
      });

      return (
        <section className={className} data-type="list" data-position="left">
          <ul>
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


