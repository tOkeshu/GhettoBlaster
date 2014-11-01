var inherits = require("util").inherits;
var SmokeServer = require("smoke-signals").SmokeServer;
var express = require("express");

function GhettoBlasterServer(config) {
  SmokeServer.call(this, config);

  var OPTIONS = {root: __dirname + "/../"};
  this.app.use('/', express.static(__dirname + '/../build'));
  this.app.get("/", function(req, res) {
    res.sendfile('/client/index.html', OPTIONS);
  });
  this.app.use('/test', express.static(__dirname + '/../test'));
}

inherits(GhettoBlasterServer, SmokeServer);

module.exports = GhettoBlasterServer;

