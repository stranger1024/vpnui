var App = (function() {

	var api = {
		views: {},
		models: {},
		collections: {},
		content: null,
		router: null,
		logins: null,
		companies: null,
		users: null,
		init: function() {
			Utils.Loading.show();

			this.content = $("#mainContent");
			Backbone.history.start();

			return this;
		},
		changeContent: function(el) {
			this.content.empty().append(el);
			return this;
		},
		pageTitle: function(title){
			$("title").text(Config.app.appName + " " + Config.app.partName +": " + title);
			$("#appName").text(Config.app.appName);
			$("#partName").text(Config.app.partName);
			$("#appVersion").text(Config.app.version);
			return this;
		},
		exit: function(){
			// if(Config.environment == "dev"){
			// 	document.location.href = "/dev.html";
			// }else {
				document.location.href = "/";
			// }
		},
	};

	var ViewsFactory = {
		home: function() {
			if(!this.homeView) {
				this.homeView = new api.views.homeView({
				});
			}
			return this.homeView;
		},
		companies: function() {
			if(!this.companiesView) {
				this.companiesView = new api.views.companiesView({
				});
			}
			return this.companiesView;
		},
		users: function() {
			if(!this.usersView) {
				this.usersView = new api.views.usersView({
				});
			}
			return this.usersView;
		},
		reports: function() {
			if(!this.reportsView) {
				this.reportsView = new api.views.reportsView({
				});
			}
			return this.reportsView;
		},
	};

	var Router = Backbone.Router.extend({

		routes: {
			"home": "mainHome",
			"users": "users",
			"companies": "companies",
			"reports": "reports",
			"": "mainHome"
		},

		mainHome: function(){
			var view = ViewsFactory.home();
			api
				.pageTitle("Admin Panel")
				.changeContent(view.$el);
			view.render();
		},
		companies: function(){
			var view = ViewsFactory.companies();
			api
				.pageTitle("Companies")
				.changeContent(view.$el);
			view.render();
		},
		users: function(){
			var view = ViewsFactory.users();
			api
				.pageTitle("Users")
				.changeContent(view.$el);
			view.render();
		},
		reports: function(){
			var view = ViewsFactory.reports();
			api
				.pageTitle("Reports")
				.changeContent(view.$el);
			view.render();
		},

	});

	api.router = new Router();

	api.router.bind('all ', function(route, section) {
		if(section != null){
			var menuItem = $("#mainMenu li[data-item="+section+"]");
			if (menuItem.hasClass('active')) {
				return;
			} else {
				$('#mainMenu li.active').removeClass('active');
				menuItem.addClass('active');
			}
		}
	});

	return api;

})();