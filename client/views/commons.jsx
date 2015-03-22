/** @jsx React.DOM */
define(function(require, exports, module) {
  var stateTree = require("flux/state");
  var Dispatcher = require("flux/dispatcher");
  var dispatcherMixin = Dispatcher.mixin(stateTree);

  var Header = React.createClass({
    mixins: [dispatcherMixin],

    togglePanel: function(event) {
      event.preventDefault();
      this.actions.togglePanel();
    },

    switchToQueue: function(event) {
      event.preventDefault();
      this.actions.switchToQueue();
    },

    render: function() {
      var queueClass = "fa fa-2x fa-music";
      var menuClass  = "fa fa-2x fa-bars";

      return (
        <header>
          <h1>{this.props.title}</h1>
          <a href="#" className={queueClass} onClick={this.switchToQueue}></a>
          <a href="#" className={menuClass} onClick={this.togglePanel}></a>
        </header>
      );
    }
  });

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

  return {
    Header: Header,
    Importer: Importer
  };
});
