(function() {
  require.config({
    baseUrl: "/"
  });

  require(['views/app'], function(App) {
    React.render(React.createElement(App), document.querySelector('body'));
  });
}());

