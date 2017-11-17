// views/companies.js

App.views.companiesView = Backbone.View.extend({
	lastSelRow: null,
	events: {
		'click #btnCompanySave': 'saveCompany',
		'click #btnCompanyNew': 'newCompany',
		'click #btnCompanyRemove': 'removeCompany',
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

		self.$el.find("input[data-type=quota]").number(true, 0, '.', ' ');
		self.$el.find("input[data-type=quota]").val(0);

		self.renderGrid();
		self.getCompanies();
	},
	refreshGrid: function(data){
		var gridArrayData = (data !== undefined) ? data : [];
		$("#companiesGrid").jqGrid('clearGridData');
		$("#companiesGrid").jqGrid('setGridParam', { data: gridArrayData});
		$("#companiesGrid").trigger('reloadGrid');
	},
	renderGrid: function(data) {
		var self = this;
		$.jgrid.defaults.responsive = true;
		$.jgrid.defaults.styleUI = 'Bootstrap';
		$.jgrid.styleUI.Bootstrap.base.rowTable = "table table-bordered table-striped";
		var w = $("#companiesGridBlock").width();
		$("#companiesGrid").jqGrid({
			datatype: "local",
			colNames: [
				"ID", "Name", "Quota"
			],
			colModel: [
				{label: 'id', name: 'id', hidden: true},
				{label: 'name', name: 'name'},
				{
					label: 'quota',
					name: 'quota',
					width: 80,
					formatter: 'currency',
					formatoptions: {
						decimalSeparator: '.',
						decimalPlaces: 0,
						suffix: ' Tb',
						thousandsSeparator: ' ',
						prefix: '',
						defaultValue: '0'
					},
				},
			],
			viewrecords: true,
			width: w,
			height: 550,
			rowNum: 35,
			scroll: 1,
			pager: "#jqCompaniesGridPager",
			gridComplete: function () {
				var rows = $("#companiesGrid").getDataIDs();
				for (var i = 0; i < rows.length; i++)
				{
					var active = $("#companiesGrid").getCell(rows[i],"active");
					if(active != ''){
						$("#companiesGrid").jqGrid('setRowData', rows[i], false, { 'background-color': 'rgba(255, 178, 173, 0.15)', color: '#979797'});
					}
				}
			},
			onSelectRow: function(id){
				if(id && id !== self.lastSelRow){
					$("#companiesGrid").jqGrid('collapseSubGridRow', self.lastSelRow);
					$(this).restoreRow(self.lastSelRow);
					self.lastSelRow = id;
				}

				self.updateCompany(id);
			},
		});

		Utils.Loading.hide();
		self.refreshGrid();
	},
	getCompanies: function(e) {
		Utils.Loading.show();

		Debug.show("get companies");

		var self = this;

		BackServices.getCompanies(function (data) {
			Utils.Loading.hide();
			self.refreshGrid(data);
		});
	},
	clearCompanyForm: function(){
		var self = this;

		self.$el.find("#btnCompanySave").attr("data-new", 0);
		self.$el.find("#btnCompanySave").prop("disabled", true);
		self.$el.find("#btnCompanyRemove").prop("disabled", true);


		self.$el.find("#companyName").val("");
		self.$el.find("#companyQuota").val("");
	},
	newCompany: function(){
		Debug.show("new company click");
		var self = this;

		self.$el.find("#companyName").val("");
		self.$el.find("#companyQuota").val("");

		self.$el.find("#btnCompanySave").attr("data-new", 1);
		self.$el.find("#btnCompanySave").prop("disabled", false);
		self.$el.find("#btnCompanyRemove").prop("disabled", true);
	},
	updateCompany: function(companyGridId){
		Debug.show("update company");
		var companyData = $("#companiesGrid").jqGrid('getRowData', companyGridId);

		var self = this;

		self.$el.find("#companyName").val(companyData.name);
		self.$el.find("#companyQuota").val(companyData.quota);
		self.$el.find("#companyId").val(companyData.id);

		self.$el.find("#btnCompanySave").attr("data-new", 0);
		self.$el.find("#btnCompanySave").prop("disabled", false);
		self.$el.find("#btnCompanyRemove").prop("disabled", false);

	},
	saveCompany: function(e){
		e.preventDefault();
		Debug.show("save company click");
		Utils.Loading.show();

		var self = this;

		var errorName = false;
		var errorQuota = false;

		var newCompany = self.$el.find("#btnCompanySave").attr("data-new");
		var companyName = self.$el.find("#companyName").val();
		var companyQuota = self.$el.find("#companyQuota").val();
		var companyId = self.$el.find("#companyId").val();

		if(companyQuota.trim() == 0) {
			errorQuota = true;
			Utils.Loading.hide();
			Utils.Popup.show('error', 'Ошибка', 'Enter Quota', "#companyQuota");
		}else{
			errorQuota = false;
		}

		if(companyName.trim() == '') {
			errorName = true;
			Utils.Loading.hide();
			Utils.Popup.show('error', 'Ошибка', 'Enter company name', "#companyName");
		}else{
			errorName = false;
		}

		if(!errorName && !errorQuota) {
			Debug.show("save company");
			if(newCompany == 1) {
				var message = "Add company <br><br>Name: " + companyName + "<br>Quota: " + companyQuota;
			}else{
				var message = "Save company<br><br>Name: " + companyName + "<br>Quota: " + companyQuota;
			}
			Utils.Popup.confirm('warning', message, function(){
				if(newCompany == 1) {
					BackServices.addCompany({
						companyName: companyName,
						companyQuota: companyQuota,
					}, function(response){
						if(response.success == 1){
							BackServices.getCompanies(function (data) {
								Utils.Loading.hide();
								Utils.Popup.show('success', 'Add company', 'company<br><br>Name: ' + companyName + '<br>Quota: ' + companyQuota + '<br><br>has been added');
								self.clearCompanyForm();
								self.refreshGrid(data);
							}, true);
						}else{
							Utils.Popup.show('error', 'Add company', 'company<br><br>Name: ' + companyName + '<br>Quota: ' + companyQuota + '<br><br>cannot added '+ response.message);
						}
					});
				}else{
					BackServices.updateCompany({
						departmentNumber: companyName,
						departmentAddress: companyQuota,
						departmentId: companyId,
					}, function(response){
						if(response.success == 1){
							BackServices.getCompanies(function (data) {
								Utils.Loading.hide();
								Utils.Popup.show('success', 'Update company', 'company<br><br>Name: ' + companyName + '<br>Quota: ' + companyQuota + '<br><br>has been updated');
								self.clearCompanyForm();
								self.refreshGrid(data);
							}, true);
						}else{
							Utils.Popup.show('error', 'Update company', 'company<br><br>Name: ' + companyName + '<br>Quota: ' + companyQuota + '<br><br>cannot updated '+ response.message);
						}
					});
				}
			}, function(){
				Utils.Loading.hide();
			});
		}
	},
	removeCompany: function(e){
		e.preventDefault();
		Debug.show("remove company click");
		Utils.Loading.show();

		var self = this;

		var companyId = self.$el.find("#companyId").val();
		var companyName = self.$el.find("#companyName").val();

		var message = "Remove company " + companyName + "";
		Utils.Popup.confirm('danger', message, function() {
			BackServices.removeDepartment(companyId, function (response) {
				Utils.Loading.hide();

				if (response.success == 1) {
					BackServices.getCompanies(function (data) {
						Utils.Popup.show('success', 'Remove Company', 'company  ' + companyName + ' has been remove');
						self.clearCompanyForm();
						self.refreshGrid(data);
					}, true);
				}
			});
		}, function(){
			Utils.Loading.hide();
		})
	},
});