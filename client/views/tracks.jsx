/** @jsx React.DOM */

define(function(require, exports, module) {
  var MusicTrack     = require("models/tracks").Track;
  var FileListReader = require("lib/file-list-reader");

  var Importer = React.createClass({
    onFiles: function(event) {
      var reader = new FileListReader(event.target.files);
      reader.filterBy('audio/mpeg').forEach(function(file) {
        reader.read(file, function(blob) {
          var track = new MusicTrack(blob);
          this.props.tracks.add(track);
        }.bind(this));
      }.bind(this));
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
            <Importer tracks={this.props.tracks}/>
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


