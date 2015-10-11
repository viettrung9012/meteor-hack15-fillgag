Template.gallery.helpers({
  images: function() {
    return Doodles.find();
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
