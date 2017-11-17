// views/users.js

App.views.usersView = Backbone.View.extend({
	lastSelRow: null,
	events: {
		'click #btnUserSave': 'saveUser',
		'click #btnUserNew': 'newUser',
		'click #btnUserRemove': 'removeUser',
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

		self.renderGrid();
		self.getCompanies();
		self.getUsers();
	},
	getCompanies: function(e) {
		Utils.Loading.show();

		Debug.show("get companies");

		var self = this;

		BackServices.getCompanies(function (data) {
			Utils.Loading.hide();
			self.renderCompaniesSelect(data);
		});
	},
	renderCompaniesSelect: function(data){
		var html = "";
		var template = _.template($("#tpl-company-list-item").html(), {});
		html += template({
			companyId: 0,
			companyName: "---",
		});

		$.each(data, function (key, value) {
			html += template({
				companyId: value.id,
				companyName: value.name,
			});
		});
		$("#userCompany").html(html);
	},
	refreshGrid: function(data){
		var gridArrayData = (data !== undefined) ? data : [];
		$("#usersGrid").jqGrid('clearGridData');
		$("#usersGrid").jqGrid('setGridParam', { data: gridArrayData});
		$("#usersGrid").trigger('reloadGrid');
	},
	renderGrid: function(data) {
		var self = this;
		$.jgrid.defaults.responsive = true;
		$.jgrid.defaults.styleUI = 'Bootstrap';
		$.jgrid.styleUI.Bootstrap.base.rowTable = "table table-bordered table-striped";
		var w = $("#usersGridBlock").width();
		$("#usersGrid").jqGrid({
			datatype: "local",
			colNames: [
				"ID", "Name", "Email", "Company ID", "Company"
			],
			colModel: [
				{label: 'id', name: 'id', hidden: true},
				{label: 'name', name: 'name'},
				{label: 'email', name: 'email'},
				{label: 'companyId', name: 'companyId', hidden: true},
				{label: 'companyName', name: 'companyName'},
			],
			viewrecords: true,
			width: w,
			height: 550,
			rowNum: 35,
			scroll: 1,
			pager: "#jqUsersGridPager",
			gridComplete: function () {
				var rows = $("#usersGrid").getDataIDs();
				for (var i = 0; i < rows.length; i++)
				{
					var active = $("#usersGrid").getCell(rows[i],"active");
					if(active != ''){
						$("#usersGrid").jqGrid('setRowData', rows[i], false, { 'background-color': 'rgba(255, 178, 173, 0.15)', color: '#979797'});
					}
				}
			},
			onSelectRow: function(id){
				if(id && id !== self.lastSelRow){
					$(this).restoreRow(self.lastSelRow);
					self.lastSelRow = id;
				}

				self.updateUser(id);
			},
		});

		Utils.Loading.hide();
		self.refreshGrid();
	},
	getUsers: function(e) {
		Utils.Loading.show();

		Debug.show("get users");

		var self = this;

		BackServices.getUsers(function (data) {
			Utils.Loading.hide();
			self.refreshGrid(data);
		});
	},
	clearUserForm: function(){
		var self = this;

		self.$el.find("#btnUserSave").attr("data-new", 0);
		self.$el.find("#btnUserSave").prop("disabled", true);
		self.$el.find("#btnUserRemove").prop("disabled", true);

		self.$el.find("#userCompany").val(0);
		self.$el.find("#userName").val("");
		self.$el.find("#userEmail").val("");
	},
	newUser: function(){
		Debug.show("new user click");
		var self = this;

		self.$el.find("#userName").val("");
		self.$el.find("#userEmail").val("");
		self.$el.find("#userCompany").val(0);

		self.$el.find("#btnUserSave").attr("data-new", 1);
		self.$el.find("#btnUserSave").prop("disabled", false);
		self.$el.find("#btnUserRemove").prop("disabled", true);
	},
	updateUser: function(userGridId){
		Debug.show("update user");
		var userData = $("#usersGrid").jqGrid('getRowData', userGridId);

		var self = this;

		self.$el.find("#userName").val(userData.name);
		self.$el.find("#userEmail").val(userData.email);
		self.$el.find("#userCompany").val(userData.companyId);
		self.$el.find("#userId").val(userData.id);

		self.$el.find("#btnUserSave").attr("data-new", 0);
		self.$el.find("#btnUserSave").prop("disabled", false);
		self.$el.find("#btnUserRemove").prop("disabled", false);

	},
	saveUser: function(e){
		e.preventDefault();
		Debug.show("save user click");
		Utils.Loading.show();

		var self = this;

		var errorName = false;
		var errorEmail = false;
		var errorCompany = false;

		var newUser = self.$el.find("#btnUserSave").attr("data-new");
		var userName = self.$el.find("#userName").val();
		var userEmail = self.$el.find("#userEmail").val();
		var userCompany = self.$el.find("#userCompany").val();
		var userId = self.$el.find("#userId").val();

		if(userCompany == 0) {
			errorCompany = true;
			Utils.Loading.hide();
			Utils.Popup.show('error', 'Ошибка', 'Select company', "#userCompany");
		}else{
			errorCompany = false;
		}

		if(userEmail.trim() == '' || !self.isEmail(userEmail)) {
			errorEmail = true;
			Utils.Loading.hide();
			Utils.Popup.show('error', 'Ошибка', 'User email must be valid email entered', "#userEmail");
		}else{
			errorEmail = false;
		}

		if(userName.trim() == '' || userName.length < 2) {
			errorName = true;
			Utils.Loading.hide();
			Utils.Popup.show('error', 'Ошибка', 'User name must be entered and name must be more than 2 characters', "#userName");
		}else{
			errorName = false;
		}

		if(!errorName && !errorCompany && !errorEmail) {
			Debug.show("save user");
			if(newUser == 1) {
				var message = "Add user <br><br>Company: " + userCompany + "<br>Name: " + userName + "<br>Email: " + userEmail;
			}else{
				var message = "Save company<br><br>Company: " + userCompany + "<br>Name: " + userName + "<br>Email: " + userEmail;
			}
			Utils.Popup.confirm('warning', message, function(){
				if(newUser == 1) {
					BackServices.addUser({
						userCompany: userCompany,
						userName: userName,
						userEmail: userEmail,
					}, function(response){
						if(response.success == 1){
							BackServices.getUsers(function (data) {
								Utils.Loading.hide();
								Utils.Popup.show('success', "Add user", "user<br><br>Company: " + userCompany + "<br>Name: " + userName + "<br>Email: " + userEmail + "<br><br>has been added");
								self.clearUserForm();
								self.refreshGrid(data);
							}, true);
						}else{
							var errors = '';
							$.each(response.message, function (key, value) {
								errors = errors + "<br>"+value;
							});
							Utils.Popup.show('error', 'Add user', "user<br><br>Company: " + userCompany + "<br>Name: " + userName + "<br>Email: " + userEmail + "<br><br>cannot added "+ errors);
						}
					});
				}else{
					BackServices.updateUser({
						userId: userId,
						userCompany: userCompany,
						userName: userName,
						userEmail: userEmail,
					}, function(response){
						if(response.success == 1){
							BackServices.getUsers(function (data) {
								Utils.Loading.hide();
								Utils.Popup.show('success', 'Update user', 'user<br><br>Company: ' + userCompany + '<br>Name: ' + userName + '<br>Email: ' + userEmail + '<br><br>has been updated');
								self.clearUserForm();
								self.refreshGrid(data);
							}, true);
						}else{
							var errors = '';
							$.each(response.message, function (key, value) {
								errors = errors + "<br>"+value;
							});
							Utils.Popup.show('error', 'Update user', 'user<br><br>Company: ' + userCompany + '<br>Name: ' + userName + '<br>Email: ' + userEmail + '<br><br>cannot updated '+ errors);
						}
					});
				}
			}, function(){
				Utils.Loading.hide();
			});
		}
	},
	removeUser: function(e){
		e.preventDefault();
		Debug.show("remove user click");
		Utils.Loading.show();

		var self = this;

		var userId = self.$el.find("#userId").val();
		var userName = self.$el.find("#userName").val();

		var message = "Remove user " + userName + "";
		Utils.Popup.confirm('danger', message, function() {
			BackServices.removeUser(userId, function (response) {
				Utils.Loading.hide();

				if (response.success == 1) {
					BackServices.getUsers(function (data) {
						Utils.Popup.show('success', 'Remove User', 'user  ' + userName + ' has been remove');
						self.clearUserForm();
						self.refreshGrid(data);
					}, true);
				}
			});
		}, function(){
			Utils.Loading.hide();
		})
	},

	isEmail: function (email) {
		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})+$/;
		if(!regex.test(email)) {
			return false;
		}else{
			return true;
		}
	}

});