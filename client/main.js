(function() {
  require.config({
    baseUrl: "/"
  });

  require(['views/app'], function(App) {
    React.renderComponent(App(), document.querySelector('body'));
  });
}());

