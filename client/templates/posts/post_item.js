Template.postItem.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url; // this refers to the current iterated object
    return a.hostname;
  }
});