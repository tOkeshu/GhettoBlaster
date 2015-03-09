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
    mixins: [stateTree.mixin],
    cursor: ['panel'],

    render: function() {
      return (
        <article>
          <Albums/>
          <Tracks/>
          <Queue/>

          <Album/>
        </article>
      );
    }
  });

  return App;
});
