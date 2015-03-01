/** @jsx React.DOM */

define(function(require, exports, module) {
  var Tracks = require("views/tracks").TrackList;
  var Queue  = require("views/queue").Queue;

  var App = React.createClass({
    getInitialState: function() {
      return {currentPanel: 0};
    },

    togglePanel: function(event) {
      event.preventDefault();
      this.setState({
        currentPanel: (this.state.currentPanel + 1) % 2
      });
    },

    current: function() {
      return this.state.currentPanel;
    },

    render: function() {
      var player = this.props.player;
      var queue  = this.props.queue;
      var tracks = this.props.tracks;
      var className = React.addons.classSet({
        'fa': true,
        'fa-3x': true,
        'fa-play': (this.state.currentPanel == 0),
        'fa-list': (this.state.currentPanel == 1)
      });
      var title = (this.state.currentPanel == 0) ? "Tracks" : "Queue";

      return (
        <section role="region">
          <header className="fixed">
            <menu type="toolbar">
              <a href="#" className={className} onClick={this.togglePanel}>
              </a>
            </menu>
            <h1>{title}</h1>
          </header>
          <Panels current={this.current}>
            <Tracks queue={queue} tracks={tracks} player={player}/>
            <Queue player={player} queue={queue}/>
          </Panels>
        </section>
      );
    }
  });

  var Panels = React.createClass({
    render: function() {
      return (
        <article className="scrollable header">{
          React.Children.map(this.props.children, function(panel, i) {
            panel.props.active = (i === this.props.current());
            return panel;
          }.bind(this))
        }</article>
      );
    }
  });

  return App;
});
