(function(window) {
  var __modules__ = {};
  function require(name) {
    var module = __modules__[name];
    if (module)
      return __modules__[name](require);

    throw new Error("Module '" + name + "' does not exists");
  }

  function module(name, exporter) {
    var module = __modules__[name];
    if (module)
      throw new Error("Module '" + name + "' already exists");

    __modules__[name] = exporter;
  }

  window.require = require;
  window.module  = module;
}(window))

