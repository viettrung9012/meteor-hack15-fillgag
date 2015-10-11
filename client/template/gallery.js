Template.gallery.rendered = function() {
  $('.sorting').show();
};

Template.gallery.helpers({
  images: function() {
    var sortBy = Session.get('sortBy');
    if (sortBy === 'latest'){
      return Doodles.find({}, {sort: {submitted: -1, _id: -1}});
    } else if (sortBy === 'popular') {
      return Doodles.find({}, {sort: {numDescendants: -1, _id: -1}});
    }
  }
});

Template.gallery.events({
  'click .thumbnail': function(event) {
    event.preventDefault();
    if (Doodles.findOne(this._id).descendants.length === 0) {
      Router.go('drawPage', {_id: this._id});
    } else {
      Router.go('galleryPage', {_id: this._id});
    }
  }
});

Template.gallery.destroyed = function() {
  $('.sorting').hide();
};
