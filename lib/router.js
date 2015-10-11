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

Router.route('/gallery/:_id', {
  name: 'galleryPage',
  waitOn: function() {
    return Meteor.subscribe('singleDoodleGallery', this.params._id);
  }, data: function() {
    return Doodles.findOne(this.params._id);
  }
});

Router.route('/:_id', {
    name: 'drawPage',
    waitOn: function() {
      return Meteor.subscribe('singleDoodle', this.params._id);
    }
});
