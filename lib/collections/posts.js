Posts = new Mongo.Collection('posts'); // Creates a local in-browser cache

Posts.allow({
  update: function(userId, post) {
    return ownsDocument(userId, post);
  },
  remove: function(userId, post) {
    return ownsDocument(userId, post);
  }
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // May only edit the following two fields: url and title
    // fieldNames is an array containing the fields being modified
    // _.without returns a sub-array containing the fields that are not url or title
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });


    if (Meteor.isServer) {
      postAttributes.title += "(server)";
      Meteor._sleepForMs(5000); // Wait for 5 seconds
    }
    else {
      postAttributes.title += "(client)";
    }

    // Search for an existing post with the same URL and
    //   return that instead of creating a new one
    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      };
    }

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    var postId = Posts.insert(post);

    return {
      _id: postId
    };
  }
});
