/** @jsx React.DOM */

define(function(require, exports, module) {
  var Tracks = require("views/tracks").TrackList;
  var Queue  = require("views/queue").Queue;
  var Albums = require("views/albums").Albums;
  var Album  = require("views/albums").Album;

  var stateTree = require("flux/state");
  var Dispatcher = require("flux/dispatcher");
  var dispatcherMixin = Dispatcher.mixin(stateTree);

  var App = React.createClass({
    mixins: [stateTree.mixin, dispatcherMixin],
    cursor: ['panel'],

    togglePanel: function() {
      this.actions.togglePanel();
    },

    render: function() {
      var panel = ({
        'albums': Albums,
        'tracks': Tracks,
        'album':  Album,
        'queue':  Queue
      })[this.cursor.get()];

      var className = React.addons.classSet({
        'fa':         true,
        'fa-3x':      true,
        'fa-list-ul': (panel === Albums),
        'fa-play':    (panel === Tracks),
        'fa-th-list': (panel === Queue)
      });

      return (
        <section role="region">
          <header className="fixed">
            <menu type="toolbar">
              <a href="#" className={className} onClick={this.togglePanel}>
              </a>
            </menu>
            <h1>{panel.title}</h1>
          </header>
          <Panels current={panel}>
            <Albums/>
            <Tracks/>
            <Queue/>

            <Album/>
          </Panels>
        </section>
      );
    }
  });

  var Panels = React.createClass({
    render: function() {
      return (
        <article className="scrollable header">{
          React.Children.map(this.props.children, function(panel) {
            panel.props.active = (panel.type === this.props.current.type);
            return panel;
          }.bind(this))
        }</article>
      );
    }
  });

  return App;
});
