Template.drawPage.rendered = function() {
  var self = this;
  $(document).ready( function(){
    //Get the canvas &
  var c = $('#tools_sketch');
  var container = $(c).parent();

    //Run function when browser resizes
    $(window).resize( respondCanvas );

    function respondCanvas(){
        c.attr('width', $(container).width() ); //max width
        c.attr('height', $(container).height() ); // max height

        if (!!self._id) {
          var doodleItem = Doodles.findOne();
          c.attr('height', $(container).width() * doodleItem.height / doodleItem.width );
        }

        //Call a function to redraw other content (texts, images etc)
    }

    //Initial call
    respondCanvas();
  });
  $(function() {
    $('.tools').append("<p></p>");
    $.each(['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#000', '#fff'], function() {
      $('.tools').append("<a href='#tools_sketch' data-color='" + this + "' style = 'float: left; border-radius: 50%; height: 32px; width: 32px;background: " + this + ";'></a>");
    });
    $.each([5, 10, 15], function() {
      $('.tools').append("<a href='#tools_sketch' data-size='" + this + "' style='float:left;text-align:center;border-radius:50%;height:32px;width:32px;background: #ccc'>" + this + "</a> ");
    });
    $('#tools_sketch').sketch();
  });
};

Template.drawPage.helpers({
  'new': function(){
    return !this._id;
  },
  'doodle': function(){
    return Doodles.findOne().doodle;
  }
});

Template.drawPage.events({
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

    var doodleItem;
    if (this._id) {
      var imageObj = new Image();
      doodleItem = Doodles.findOne();
      imageObj.src = doodleItem.doodle;
      context.drawImage(imageObj, 0, 0, doodleItem.width, doodleItem.height, 0, 0, w, h);
    } else {
      context.fillStyle = 'white';
      context.fillRect(0, 0, w, h);
    }

    var imageData = canvas.get(0).toDataURL("image/png");

    //clear the canvas
    context.clearRect (0,0,w,h);

    //restore it with original / cached ImageData
    context.putImageData(data, 0,0);

    //reset the globalCompositeOperation to what it was
    context.globalCompositeOperation = compositeOperation;

    Meteor.call('doodleInsert', {
      original: (this._id) ? doodleItem._id : '0',
      width: canvas.width(),
      height: canvas.height(),
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

      if (this._id) {
        Router.go('galleryPage', {
          _id: doodleItem._id
        });
      } else {
        Router.go('gallery');
      }
    });
  }
});
