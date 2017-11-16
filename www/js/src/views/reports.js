// views/reports.js

App.views.reportsView = Backbone.View.extend({
	events: {

	},
	el: $("#mainContent"),
	template: _.template($('#tpl-reports').html()),
	initialize: function() {

	},

	render: function(){
		Utils.Loading.hide();

		var self = this;

		$(this.el).html(this.template({
		}));



	},

});