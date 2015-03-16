Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading', // Built-in Iron Router loading template
  notFoundTemplate: 'notFound',
  // Defined globally in router level so it will only happen once
  // So that Iron Router knows when the route has the data it needs to render
  waitOn: function() { // Wait until posts subscription is done grabbing data from the server
    return Meteor.subscribe('posts');
  }
});
Router.route('/', {
  name: 'postsList'
});
Router.route('/posts/:_id', {
  name: 'postPage',
  data: function() {
    return Posts.findOne(this.params._id);
  }
});
Router.route('/submit', {
  name: 'postSubmit'
});

var requireLogin = function() {
  if (!Meteor.user()) {
    this.render('accessDenied');
  } else {
    this.next();
  }
};

// Show not found template whenever data function returns a falsy object
Router.onBeforeAction('dataNotFound', {
  only: 'postPage'
});
Router.onBeforeAction(requireLogin, {
  only: 'postSubmit'
});
