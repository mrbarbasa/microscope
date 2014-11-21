Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading', // Built-in Iron Router loading template
  // Defined globally in router level so it will only happen once
  // So that Iron Router knows when the route has the data it needs to render
  waitOn: function() { // Wait until posts subscription is done grabbing data from the server
    return Meteor.subscribe('posts');
  }
});
Router.route('/', {
  name: 'postsList'
});
