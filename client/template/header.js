Session.set('sortBy', 'latest');

Template.header.rendered = function() {
	$('.selectpicker').selectpicker();
	$('.selectpicker').on('change', function() {
		Session.set('sortBy', this.value);
	});
};

Template.header.helpers({
	activeRouteClass: function(/* route name */) {
		var args = Array.prototype.slice.call(arguments, 0);
		args.pop();

		var active = _.any(args, function(name) {
			return Router.current() && Router.current().route.getName() === name;
		});

		return active && 'active';
	}
});
