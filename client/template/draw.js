Template.draw.helpers({
  images: [
    1, 2, 3, 4, 5
  ]
});

Template.draw.events({
  'click .thumbnail': function(event) {
    event.preventDefault();
    Router.go('drawPage', {_id: 1});
  }
});
