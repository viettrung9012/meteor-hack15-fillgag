Template.draw.helpers({
  images: function() {
    return Doodles.find();
  }
});

Template.draw.events({
  'click .thumbnail': function(event) {
    event.preventDefault();
    Router.go('drawPage', {_id: this._id});
  }
});
