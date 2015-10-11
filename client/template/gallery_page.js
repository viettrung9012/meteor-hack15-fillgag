Template.galleryPage.helpers({
  original: function() {
    console.log(this);
    return this.doodle;
  },
  images: function() {
    return Doodles.find({original: this._id});
  }
});

Template.galleryPage.events({
  'click .thumbnail': function(event) {
    event.preventDefault();
    Router.go('drawPage', {_id: this._id});
  }
});
