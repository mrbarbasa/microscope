Posts = new Mongo.Collection('posts'); // Creates a local in-browser cache

Posts.allow({
  insert: function(userId, doc) {
    // Only allow posting if you are logged in
    return !! userId;
  }
});
