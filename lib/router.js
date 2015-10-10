Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'draw'
});

Router.route('/gallery', {
  name: 'gallery'
});

Router.route('/:_id', {
    name: 'drawPage'
});
