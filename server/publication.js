Meteor.publish('doodles', function(){
  return Doodles.find();
});

Meteor.publish('singleDoodle', function(doodleId) {
  check(doodleId, String);
  return Doodles.find(doodleId);
});

Meteor.publish('singleDoodleGallery', function(doodleId) {
  check(doodleId, String);
  return Doodles.find({$or: [
      {_id: doodleId},
      {original: doodleId}
    ]
  });
});
