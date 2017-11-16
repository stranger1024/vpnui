// views/companies.js

App.views.companiesView = Backbone.View.extend({
	lastSelRow: null,
	events: {
	},
	el: $("#mainContent"),
	template: _.template($('#tpl-companies').html()),
	initialize: function() {

	},
	render: function(){
		Utils.Loading.hide();

		var self = this;

		$(this.el).html(this.template({
		}));


	},


});