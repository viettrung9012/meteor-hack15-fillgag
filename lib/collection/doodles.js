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
      upvoters: []
    });

    var doodleId = Doodles.insert(item);

    return {
      _id: doodleId
    };
  }
});
