Template.gallery.helpers({
  images: function() {
    return Doodles.find();
  }
});

Template.gallery.events({
  'click .thumbnail': function(event) {
    event.preventDefault();
    Router.go('galleryPage', {_id: this._id});
  }
});
