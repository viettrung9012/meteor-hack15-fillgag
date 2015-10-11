Template.draw.rendered = function() {
  $('.sorting').show();
};

Template.draw.helpers({
  images: function() {
    var sortBy = Session.get('sortBy');
    if (sortBy === 'latest'){
      return Doodles.find({}, {sort: {submitted: -1, _id: -1}});
    } else if (sortBy === 'popular') {
      return Doodles.find({}, {sort: {numDescendants: -1, _id: -1}});
    }
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

Template.draw.destroyed = function() {
  $('.sorting').hide();
};
