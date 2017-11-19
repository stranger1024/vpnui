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

		self.getCountCompanies();
		self.getCountUsers();
	},
	getCountCompanies: function(e) {
		Utils.Loading.show();

		Debug.show("get coount companies");

		var self = this;

		BackServices.getCountInfo("companies", function (response) {
			Utils.Loading.hide();
			self.$el.find("#countCompanies").text(response);
		});
	},
	getCountUsers: function(e) {
		Utils.Loading.show();

		Debug.show("get coount users");

		var self = this;

		BackServices.getCountInfo("users", function (response) {
			Utils.Loading.hide();
			self.$el.find("#countUsers").text(response);
		});
	},

});