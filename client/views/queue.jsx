/** @jsx React.DOM */

define(function(require, exports, module) {
  var stateTree = require("flux/state");
  var Dispatcher = require("flux/dispatcher");
  var dispatcherMixin = Dispatcher.mixin(stateTree);

  var Header = require("views/commons").Header;

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
            <p>{`${this.props.index + 1} · ${track.title}`}</p>
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
        <div className="player">
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
    cursors: {
      panel: ['panel'],
      queue: ['queue']
    },

    statics: {
      title: "Queue"
    },

    render: function() {
      var tracks = this.cursors.queue.get('tracks').toArray();
      var active = this.cursors.panel.get() === 'queue';

      var className = React.addons.classSet({
        panel: true,
        active: active
      });

      return (
        <section className={className}>
          <Header title="Queue"/>
          <ul className="content">
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


