Template.galleryPage.helpers({
  original: function() {
    return this.doodle;
  },
  images: function() {
    return Doodles.find({original: this._id});
  }
});

Template.galleryPage.events({
  'click .thumbnail': function(event) {
    event.preventDefault();
    if (Doodles.findOne(this._id).descendants.length === 0 || Router.current().params._id === this._id) {
      Router.go('drawPage', {_id: this._id});
    } else {
      Router.go('galleryPage', {_id: this._id});
    }
  }
});
