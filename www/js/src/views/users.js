// views/users.js

App.views.usersView = Backbone.View.extend({
	lastSelRow: null,
	events: {
	},
	el: $("#mainContent"),
	template: _.template($('#tpl-users').html()),
	initialize: function() {

	},
	render: function(){
		Utils.Loading.hide();

		var self = this;

		$(this.el).html(this.template({
		}));


	},


});