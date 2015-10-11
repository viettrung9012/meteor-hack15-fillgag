Doodles = new Mongo.Collection("doodles");

Meteor.methods({
  'doodleInsert': function(doodleAttributes) {
    check(Meteor.userId(), String);
    check(doodleAttributes, {
      original: Match.Optional(String),
      width: Number,
      height: Number,
      doodle: String
    });

    var duplicateDoodle = Doodles.findOne({
        doodle: doodleAttributes.doodle
    });
    if (duplicateDoodle) {
        return {
            postExists: true,
            _id: duplicateDoodle._id
        };
    }

    var user = Meteor.user();
    var item = _.extend(doodleAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date(),
      votes: 0,
      upvoters: [],
      descendants: [],
      numDescendants: 0
    });

    var doodleId = Doodles.insert(item);

    if (doodleAttributes.original && doodleAttributes.original !== "0") {
      Doodles.update({
          _id: doodleAttributes.original,
          descendants: {$ne: doodleId}
      }, {
          $addToSet: {descendants: doodleId},
          $inc: {numDescendants: 1}
      });
    }

    return {
      _id: doodleId
    };
  }
});
