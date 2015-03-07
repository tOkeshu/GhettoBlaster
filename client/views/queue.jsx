/** @jsx React.DOM */

define(function(require, exports, module) {
  var stateTree = require("flux/state");
  var Dispatcher = require("flux/dispatcher");
  var dispatcherMixin = Dispatcher.mixin(stateTree);

  var Track = React.createClass({
    mixins: [stateTree.mixin, dispatcherMixin],
    cursors: {
      queue: ["queue"],
      player: ['player']
    },

    togglePlay: function() {
      if (this.cursors.queue.get('index') === this.props.index) {
        if (this.cursors.player.get('playing'))
          this.actions.player.pause();
        else
          this.actions.player.play()
      } else {
        this.actions.player.play(this.props.index);
      }
    },

    showNumber: function() {
      return (this.props.index + 1) + " · ";
    },

    render: function() {
      var currentIndex = this.cursors.queue.get('index');
      var track        = this.props.track;
      var className    = React.addons.classSet({
        track: true,
        playing: (this.props.index === currentIndex)
      });

      return (
        <li className={className}>
          <a href="#" onClick={this.togglePlay}>
            <p>{this.showNumber()}{track.title}</p>
          </a>
        </li>
      );
    }
  });

  var Player = React.createClass({
    mixins: [stateTree.mixin, dispatcherMixin],
    cursor: ["player"],

    togglePlay: function() {
      var player = this.cursor.get();

      if (player.playing)
        this.actions.player.pause();
      else if (player.track)
        this.actions.player.play();
      else
        this.actions.player.next();
    },

    previous: function() {
      this.actions.player.previous();
    },

    next: function() {
      this.actions.player.next();
    },

    render: function() {
      var playingIcon = this.cursor.get('playing') ? "fa-pause" : "fa-play";

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
    mixins: [stateTree.mixin, dispatcherMixin],
    cursor: ['player', 'progress'],

    render: function() {
      var style = {width: this.cursor.get() + "%"}
      return (
        <div className="progress">
          <div className="bar" style={style}>
          </div>
        </div>
      );
    }
  });

  var Queue = React.createClass({
    mixins: [stateTree.mixin, dispatcherMixin],
    cursor: ['queue'],

    statics: {
      title: "Queue"
    },

    render: function() {
      var tracks = this.cursor.get('tracks').toArray();
      var className = React.addons.classSet({
        queue: true,
        panel: true,
        current: this.props.active
      });

      return (
        <section className={className} data-type="list" data-position="right">
          <ul>
            {tracks.map(function(track, index) {
              return <Track track={track} index={index}/>;
            }.bind(this))}
          </ul>
          <Progress/>
          <Player/>
        </section>
      );
    }
  });

  return {
    Track: Track,
    Queue: Queue
  };
});


