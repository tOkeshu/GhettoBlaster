/** @jsx React.DOM */

module("views/queue", function(require) {
  var Track = React.createClass({
    getInitialState: function() {
      return {playing: this.props.player.playing};
    },

    componentDidMount: function() {
      var changePlayingState = function() {
        var player  = this.props.player;
        var playing = player.playing;

        if (player.track !== this.props.track)
          playing = false;

        this.setState({playing: playing});
      }.bind(this);

      this.props.player.on("track:change", changePlayingState);
      this.props.player.on("play",         changePlayingState);
      this.props.player.on("pause",        changePlayingState);
      this.props.player.on("stop" ,        changePlayingState);
    },

    togglePlay: function() {
      if (this.state.playing)
        this.props.player.pause();
      else {
        this.props.queue.setTrack(this.props.track);
        this.props.player.play(this.props.track);
      }
    },

    render: function() {
      var player  = this.props.player;
      var track   = this.props.track;
      var className = React.addons.classSet({
        track: true,
        playing: (track === player.track)
      });

      return (
        <li className={className}>
          <a href="#" onClick={this.togglePlay}>
            <p>{track.title}</p>
          </a>
        </li>
      );
    }
  });

  var Player = React.createClass({
    getInitialState: function() {
      return {playing: this.props.player.playing};
    },

    componentDidMount: function() {
      var changePlayingState = function() {
        this.setState({playing: this.props.player.playing});
      }.bind(this);

      this.props.player.on("track:change", changePlayingState);
      this.props.player.on("play",         changePlayingState);
      this.props.player.on("pause",        changePlayingState);
      this.props.player.on("stop" ,        changePlayingState);
      this.props.player.on("track:end",    this.next.bind(this));
    },

    togglePlay: function() {
      if (this.state.playing)
        this.props.player.pause();
      else if (this.props.player.track)
        this.props.player.play();
      else
        this.props.player.play(this.props.queue.next());
    },

    previous: function() {
      var track = this.props.queue.previous();
      if (track)
        this.props.player.play(track);
    },

    next: function() {
      var track = this.props.queue.next();
      if (track)
        this.props.player.play(track);
    },

    render: function() {
      var playingIcon = this.state.playing ? "fa-pause" : "fa-play";

      return (
        <div role="toolbar" className="player">
          <button onClick={this.previous}>
            <span className="fa fa-3x fa-backward"></span>
          </button>
          <button onClick={this.togglePlay}>
            <span className={"fa fa-3x " + playingIcon}></span>
          </button>
          <button onClick={this.next}>
            <span className="fa fa-3x fa-forward"></span>
          </button>
        </div>
      );
    }
  });

  var Progress = React.createClass({
    getInitialState: function() {
      return {progress: 0};
    },

    componentDidMount: function() {
      var changeProgressState = function(progress) {
        this.setState({progress: progress});
      }.bind(this);

      this.props.player.on("track:progress", changeProgressState);
    },

    render: function() {
      var style = {width: this.state.progress + "%"}
      return (
        <div className="progress">
          <div className="bar" style={style}>
          </div>
        </div>
      );
    }
  });

  var Queue = React.createClass({
    getInitialState: function() {
      return {tracks: []};
    },

    componentDidMount: function() {
      this.props.queue.on("add" , this.onAddedTrack);
    },

    onAddedTrack: function(track) {
      this.setState({tracks: this.props.queue.slice()});
    },

    render: function() {
      var player = this.props.player;
      var queue  = this.props.queue;
      var className = React.addons.classSet({
        queue: true,
        panel: true,
        current: this.props.active
      });

      return (
        <section className={className} data-type="list" data-position="right">
          <ul>
            {this.state.tracks.map(function(track) {
              return <Track track={track} player={player} queue={queue}/>;
            }.bind(this))}
          </ul>
          <Progress player={player}/>
          <Player player={player} queue={queue}/>
        </section>
      );
    }
  });

  return {
    Track: Track,
    Queue: Queue
  };
});


