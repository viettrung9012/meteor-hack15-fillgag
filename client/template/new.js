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

    var userId = Meteor.userId();
    if (!userId) {
      return throwError('Please Log-in to Save your Gag');
    }

    var canvas = $('#tools_sketch');
    var context = canvas.get(0).getContext('2d');

    var w = canvas.width();
    var h = canvas.height();

    //get the current ImageData for the canvas.
    var data = context.getImageData(0, 0, w, h);

    //store the current globalCompositeOperation
    var compositeOperation = context.globalCompositeOperation;

    //set to draw behind current content
    context.globalCompositeOperation = "destination-over";

    var ctx = canvas.get(0).getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, w, h);

    var imageData = canvas.get(0).toDataURL("image/png");

    //clear the canvas
    context.clearRect (0,0,w,h);

    //restore it with original / cached ImageData
    context.putImageData(data, 0,0);

    //reset the globalCompositeOperation to what it was
    context.globalCompositeOperation = compositeOperation;

    Meteor.call('doodleInsert', {
      width: $('#tools_sketch').width(),
      height: $('#tools_sketch').height(),
      doodle: imageData
    }, function(error, result) {
      // display the error to the user and abort
      if (error){
        throwError(error);
      }
      // show this result but route anyway
      if (result.postExists) {
        throwError('This doodle has already been created');
      }

      Router.go('gallery');
    });
  }
});
