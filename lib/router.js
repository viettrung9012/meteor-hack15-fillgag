Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'draw',
  waitOn: function() {
    return Meteor.subscribe('doodles');
  }
});

Router.route('/new', {
  name: 'new',
  waitOn: function() {
    return Meteor.subscribe('doodles');
  }
});

Router.route('/gallery', {
  name: 'gallery',
  waitOn: function() {
    return Meteor.subscribe('doodles');
  }
});

Router.route('/:_id', {
    name: 'drawPage',
    waitOn: function() {
      return Meteor.subscribe('singleDoodle', this.params._id);
    }
});
