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

    renderButton: function() {
      var className = "fa fa-3x fa-th-list";
      return (
        <a href="#" className={className} onClick={this.togglePanel}></a>
      );
    },

    render: function() {
      return (
        <header>
          <h1>{this.props.title}</h1>
          {this.renderButton()}
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
