define(function(require, exports, module) {
  var Albums = require("views/albums").Albums;
  var Album  = require("views/albums").Album;
  var Tracks = require("views/tracks").TrackList;
  var Queue  = require("views/queue").Queue;

  var App = React.createClass({
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
