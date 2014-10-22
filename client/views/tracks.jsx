/** @jsx React.DOM */

module("views/tracks", function(require) {
  var MusicTrack     = require("models/tracks").Track;
  var FileListReader = require("lib/file-list-reader");

  var Track = React.createClass({
    addToQueue: function() {
      this.props.queue.add(this.props.track);
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
    getInitialState: function() {
      return {tracks: []};
    },

    componentDidMount: function() {
      this.props.tracks.on("add" , this.onAddedTrack);
    },

    onAddedTrack: function(track) {
      this.setState({tracks: this.props.tracks.slice()});
    },

    render: function() {
      var queue = this.props.queue;
      var className = React.addons.classSet({panel: true, current: this.props.active});

      return (
        <section className={className} data-type="list" data-position="left">
          <ul>
            {this.state.tracks.map(function(track) {
              return <Track track={track} queue={queue}/>;
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


