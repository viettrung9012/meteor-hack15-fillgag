Template.draw.helpers({
  images: function() {
    return Doodles.find();
  }
});

Template.draw.events({
  'click .thumbnail': function(event) {
    event.preventDefault();
    if (!this._id) {
      this._id = 0;
    }
    Router.go('drawPage', {_id: this._id});
  }
});
