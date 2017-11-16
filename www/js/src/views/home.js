// views/home.js

App.views.homeView = Backbone.View.extend({
	lastSelRow: null,
	events: {
	},
	el: $("#mainContent"),
	template: _.template($('#tpl-home').html()),
	initialize: function() {

	},
	render: function(){
		Utils.Loading.hide();

		var self = this;

		$(this.el).html(this.template({
		}));


	},


});