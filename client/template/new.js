Template.new.rendered = function() {
  $(document).ready( function(){
    //Get the canvas &
  var c = $('#tools_sketch');
  var container = $(c).parent();

    //Run function when browser resizes
    $(window).resize( respondCanvas );

    function respondCanvas(){
        c.attr('width', $(container).width() ); //max width
        c.attr('height', $(container).height() ); //max height

        //Call a function to redraw other content (texts, images etc)
        var ctx = c.get(0).getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,c.width(),c.height());
    }

    //Initial call
    respondCanvas();
  });
  $(function() {
    $.each([5, 10, 15], function() {
      $('.tools').append("<a href='#tools_sketch' data-size='" + this + "' style='background: #ccc'>" + this + "</a> ");
    });
    $('#tools_sketch').sketch();
  });
};

Template.new.events({
  'click #submit': function(event) {
    event.preventDefault();
    Meteor.call('doodleInsert', {
      width: $('#tools_sketch').width(),
      height: $('#tools_sketch').height(),
      doodle: $('#tools_sketch').get(0).toDataURL()
    }, function(error, result) {
      // display the error to the user and abort
      if (error){
        throwError(error);
      }
      // show this result but route anyway
      if (result.postExists) {
        throwError('This doodle has already been created');
      }

      Router.go('drawPage', {
        _id: result._id
      });
    });
  }
});
