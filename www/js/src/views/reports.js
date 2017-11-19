// views/reports.js

App.views.reportsView = Backbone.View.extend({
	events: {
		'click #btnGenerateData': 'generateData',
		'click #btnShowReport': 'getReport',
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

		self.renderGrid();
	},
	generateData: function(e){
		e.preventDefault();
		Debug.show("generate data");
		Utils.Loading.show();

		var self = this;

		BackServices.generateData(function (data) {
			Utils.Loading.hide();
			var reportMonth = self.$el.find("#reportMonth").val();
			if(reportMonth != 0){
				self.$el.find("#btnShowReport").trigger("click");
			}
		});

	},
	getReport: function(e){
		e.preventDefault();
		Debug.show("show report");
		Utils.Loading.show();

		var self = this;

		var errorMonth = false;
		var reportMonth = self.$el.find("#reportMonth").val();

		if(reportMonth == 0) {
			errorMonth = true;
			Utils.Loading.hide();
			Utils.Popup.show('error', 'Ошибка', 'select report month', "#reportMonth");
		}else{
			errorMonth = false;
		}

		if(!errorMonth) {
			BackServices.getCompanyBloked(reportMonth, function (data) {
				Utils.Loading.hide();
				self.refreshGrid(data.companies);
			});
		}
	},
	refreshGrid: function(data){
		var gridArrayData = (data !== undefined) ? data : [];
		$("#reportsGrid").jqGrid('clearGridData');
		$("#reportsGrid").jqGrid('setGridParam', { data: gridArrayData});
		$("#reportsGrid").trigger('reloadGrid');
	},
	renderGrid: function(data) {
		var self = this;
		$.jgrid.defaults.responsive = true;
		$.jgrid.defaults.styleUI = 'Bootstrap';
		$.jgrid.styleUI.Bootstrap.base.rowTable = "table table-bordered table-striped";
		var w = $("#reportsGridBlock").width();
		$("#reportsGrid").jqGrid({
			datatype: "local",
			colNames: [
				"ID", "Company", "Quota", "Transfers"
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
				{
					label: 'transfer',
					name: 'transfer',
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
			height: 490,
			rowNum: 35,
			scroll: 1,
			pager: "#jqReportsGridPager",
			subGrid: true,
			gridComplete: function () {
				var rows = $("#reportsGrid").getDataIDs();
				for (var i = 0; i < rows.length; i++)
				{
					var active = $("#reportsGrid").getCell(rows[i],"active");
					if(active != ''){
						$("#reportsGrid").jqGrid('setRowData', rows[i], false, { 'background-color': 'rgba(255, 178, 173, 0.15)', color: '#979797'});
					}
				}
			},
			onSelectRow: function(id){
				if(id && id !== self.lastSelRow){
					$("#reportsGrid").jqGrid('collapseSubGridRow', self.lastSelRow);
					$(this).restoreRow(self.lastSelRow);
					self.lastSelRow = id;
				}

				$("#reportsGrid").jqGrid('expandSubGridRow', id);
			},
			subGridRowExpanded: function(parentRowID, parentRowKey) {
				console.log("open subgrid");
				Utils.Loading.show();

				var childGridID = parentRowID + "_table";
				var childGridPagerID = parentRowID + "_pager";

				$('#' + parentRowID).append('<table id="' + childGridID + '" style="width: 100%"></table><div id="' + childGridPagerID + '" class="scroll"></div>');
				var subw = $('#' + parentRowID).width();

				var month = self.$el.find("#reportMonth").val();
				var company = $("#reportsGrid").jqGrid('getRowData', parentRowKey);
				BackServices.getTransfersLog(month, company.id, function (data) {
					Utils.Loading.hide();
					$("#" + childGridID).jqGrid({
						datatype: "local",
						page: 1,
						colNames: [
							"User", "Date/Time", "Resourse", "Transfered"
						],
						colModel: [
							{label: 'user', name: 'user', width: 80},
							{label: 'date', name: 'date', width: 65},
							{label: 'resourse', name: 'resourse'},
							{
								label: 'bites',
								name: 'bites',
								width: 60,
								formatter: 'currency',
								formatoptions: {
									decimalSeparator: '.',
									decimalPlaces: 0,
									suffix: ' Gb',
									thousandsSeparator: ' ',
									prefix: '',
									defaultValue: '0'
								},
							},
						],
						loadonce: true,
						width: subw,
						height: 325,
						rowNum: 15,
						scroll: 1,
						pager: "#" + childGridPagerID
					});

					var gridData = data.log;
					// $.each(data, function(index, item){
					// });
					$("#" + childGridID).jqGrid('clearGridData');
					$("#" + childGridID).jqGrid('setGridParam', { data: gridData});
					$("#" + childGridID).trigger('reloadGrid');

					Utils.Loading.hide();
				}, childGridPagerID);
			},
			subGridOptions : {
				// load the subgrid data only once
				// and the just show/hide
				reloadOnExpand :false,
				// select the row when the expand column is clicked
				selectOnExpand : true,
				plusicon: "fa fa-folder-o",
				minusicon: "fa fa-folder-open-o"
			},
		});

		Utils.Loading.hide();
		self.refreshGrid();
	},

});