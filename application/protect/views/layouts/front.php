<!doctype html>
<html>
<head>
	<meta charset="UTF-8">
	<meta http-equiv='cache-control' content='no-cache'>
	<meta http-equiv='expires' content='0'>
	<meta http-equiv='pragma' content='no-cache'>

	<title><% pageTitle %></title>
	<link rel="stylesheet" href="css/bootstrap.css" />
	<!--<link rel="stylesheet" href="css/navbar-fixed-side.css" />-->
	<link rel="stylesheet" type="text/css" media="screen" href="js/vendor/jqGrid/css/ui.jqgrid-bootstrap.css" />

	<link rel="stylesheet" href="js/vendor/datetimepicker/css/bootstrap-datetimepicker.min.css">
	<link rel="stylesheet" href="css/font-awesome/css/font-awesome.min.css">
	<link rel="stylesheet" href="css/front.css" />

</head>
<body>
<div class="container-fluid">
	<div class="row">
		<nav class="navbar navbar-default">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
					<span class="sr-only">Menu</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
			</div>
			<div class="collapse navbar-collapse navbar-ex1-collapse">
				<ul id="mainMenu" class="nav navbar-nav" style="width: 100%;">
					<li data-index="1" data-item="mainHome"><a href='#home'><span class="menuItemTitle">Home</span></a></li>
					<li data-index="2" data-item="companies"><a href='#companies'><span class="menuItemTitle">Companies</span></a></li>
					<li data-index="3" data-item="users"><a href='#users'><span class="menuItemTitle">Users</span></a></li>
					<li data-index="4" data-item="reports"><a href='#reports'><span class="menuItemTitle">Reports</span></a></li>
				</ul>
			</div>
		</nav>
		<div class="container">
			<div id="mainContent">

			</div>
		</div>
	</div>
</div>

<div class="loader ln2" style="display:none;">
	<div class="loader-wheel">
	</div>
</div>

<!-- Modal -->
<div class="modal fade" id="modalDialog" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title"></h4>
				<button type="button" class="close modalClose" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div id="shortMessage">
				</div>
			</div>
			<div class="modal-footer">
				<button id="btnClose" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

<!-- Modal Confirm-->
<div class="modal fade" id="modalConfirm" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title"></h4>
				<button type="button" class="close modalClose" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<p></p>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-success" id="btnOk">Yes</button>
				<button type="button" class="btn btn-danger" id="btnCancel" data-dismiss="modal">No</button>
			</div>
		</div>
	</div>
</div>

<script type="text/template" id="tpl-menu-item">
	<!--<li data-index="<%= index %>" data-item="<%= name %>"><a href='<%= route %>'><i class="fa <%= icon %>" title="<%= title %>"></i><span class="menuItemTitle"><%= title %></span></a></li>-->
	<li data-index="<%= index %>" data-item="<%= name %>"><a href='<%= route %>'><img src="img/<%= icon %>.svg" title="<%= title %>" width="22px"><span class="menuItemTitle"><%= title %></span></a></li>
</script>

<script type="text/template" id="tpl-company-list-item">
	<option value="<%= companyId %>"><%= companyName %></option>
</script>

<!-- home tempate -->
<script type="text/template" id="tpl-home">
	<div class="col-lg-12" style="border: 2px solid #777;">
		<div class="dLabel" style="">Admin Panel</div>
			<p class="text-info">
				<label>Companies:</label>&nbsp;<label id="countCompanies"></label>
			</p>
			<p class="text-info">
				<label>Users:</label>&nbsp;<label id="countUsers"></label>
			</p>
	</div>
</script>

<!-- companies tempate -->
<script type="text/template" id="tpl-companies">
	<div class="col-lg-12" style="border: 2px solid #777">
		<div class="dLabel" style="">Companies</div>

		<div class="col-lg-9" style="padding: 0px;" id="companiesGridBlock">
			<table id="companiesGrid" class="table table-hover" style="width: 100%">

			</table>
			<div id="jqCompaniesGridPager"></div>
		</div>
		<div class="col-lg-3 leftBlock" style="padding-right: 15px; padding-left: 15px; height: 653px;">
			<div class="form-group">
				<label class="label label-default">Name</label>
				<input type="text" id="companyName" class="form-control" placeholder="company name" value="">
			</div>
			<div class="form-group">
				<label class="label label-default">Quota</label>
				<div class="input-group">
					<input type="text" id="companyQuota" data-type="quota" class="form-control" placeholder="company quota">
					<span class="input-group-btn">
						<button class="btn btn-default" type="button">Tb</button>
					</span>
				</div>
			</div>

			<div class="form-group" style="text-align: center;">
				<input type="hidden" id="companyId" value="">
				<button id="btnCompanySave" type="button" class="btn btn-success btn-sm" data-new="0" disabled style="height: 50px;width: 120px;">
					<i class="fa fa-check" aria-hidden="true"></i>
					Save</button>
				<button id="btnCompanyNew" type="button" class="btn btn-primary btn-sm" style="height: 50px;width: 120px;">
					<i class="fa fa-plus" aria-hidden="true"></i>
					New company</button>
				<br><br>
				<button id="btnCompanyRemove" type="button" class="btn btn-danger btn-sm" disabled style="height: 50px;width: 140px;">
					<i class="fa fa-minus" aria-hidden="true"></i>
					Remove company</button>
			</div>
		</div>
	</div>
</script>

<!-- users tempate -->
<script type="text/template" id="tpl-users">
	<div class="col-lg-12" style="border: 2px solid #777">
		<div class="dLabel" style="">Users</div>

		<div class="col-lg-9" style="padding: 0px;" id="usersGridBlock">
			<table id="usersGrid" class="table table-hover" style="width: 100%">

			</table>
			<div id="jqUsersGridPager"></div>
		</div>
		<div class="col-lg-3 leftBlock" style="padding-right: 15px; padding-left: 15px; height: 653px;">
			<div class="form-group">
				<label class="label label-default">Company</label>
				<select class="form-control input-lg" id="userCompany">
					<option value="0">---</option>
				</select>
			</div>
			<div class="form-group">
				<label class="label label-default">Name</label>
				<input type="text" id="userName" class="form-control" placeholder="user name" value="">
			</div>
			<div class="form-group">
				<label class="label label-default">Email</label>
				<input type="text" id="userEmail" class="form-control" placeholder="user email" value="">
			</div>

			<div class="form-group" style="text-align: center;">
				<input type="hidden" id="userId" value="">

				<button id="btnUserSave" type="button" class="btn btn-success btn-sm" data-new="0" disabled style="height: 70px;width: 120px;">
					<i class="fa fa-check" aria-hidden="true"></i>
					Save</button>
				<button id="btnUserNew" type="button" class="btn btn-primary btn-sm" style="height: 70px;width: 120px;">
					<i class="fa fa-plus" aria-hidden="true"></i>
					New user</button>
				<br><br>
				<button id="btnUserRemove" type="button" class="btn btn-danger btn-sm" style="height: 70px;width: 120px;">
					<i class="fa fa-minus" aria-hidden="true"></i>
					Remove user</button>
			</div>
		</div>
	</div>
</script>

<!-- reports tempate -->
<script type="text/template" id="tpl-reports">
	<div class="col-lg-12" style="border: 2px solid #777">
		<div class="dLabel" style="">Reports</div>
		<div class="text-right">
			<button id="btnGenerateData" type="button" class="btn btn-default">
				<i class="fa fa-gears" aria-hidden="true"></i>
				Generate Data</button>
		</div>

		<div class="col-md-4">
			<label class="label label-default">Month</label>
			<select class="form-control input-lg" id="reportMonth">
				<option value="0">---</option>
				<option value="01">January</option>
				<option value="02">February</option>
				<option value="03">March</option>
				<option value="04">April</option>
				<option value="05">May</option>
				<option value="06">June</option>
				<option value="07">July</option>
				<option value="08">August</option>
				<option value="09">September</option>
				<option value="10">October</option>
				<option value="11">November</option>
				<option value="12">December</option>
			</select>
		</div>
		<div class="col-md-8" style="padding-top: 25px;">
			<button id="btnShowReport" type="button" class="btn btn-success">
				<i class="fa fa-file-text" aria-hidden="true"></i>
				Show Report</button>
		</div>
		<div class="col-md-12">
			<div class="col-lg-12" style="padding: 0px;" id="reportsGridBlock">
				<table id="reportsGrid" class="table table-hover" style="width: 100%">

				</table>
				<div id="jqReportsGridPager"></div>
			</div>
		</div>
</script>


<script src="js/vendor/jquery.min.js"></script>
<script src="js/vendor/jquery-ui.min.js"></script>
<script src="js/vendor/jquery.number.min.js" ></script>
<script src="js/vendor/jqGrid/js/i18n/grid.locale-en.js" type="text/javascript"></script>
<script src="js/vendor/jqGrid/js/jquery.jqGrid.min.js" type="text/javascript"></script>


<script src="js/vendor/bootstrap.min.js"></script>
<script type="text/javascript" src="js/vendor/moment/min/moment.min.js" ></script>
<script type="text/javascript" src="js/vendor/moment/min/locales.min.js" ></script>
<script type="text/javascript" src="js/vendor/datetimepicker/js/bootstrap-datetimepicker.min.js" ></script>
<script src="js/vendor/underscore.js"></script>
<script src="js/vendor/backbone.js"></script>

<script src="js/src/config.js"></script>
<script src="js/src/utils.js"></script>
<script src="js/src/models/backservice.js"></script>

<script src="js/src/app.js"></script>
<script src="js/src/views/home.js"></script>
<script src="js/src/views/companies.js"></script>
<script src="js/src/views/users.js"></script>
<script src="js/src/views/reports.js"></script>

<script>
	App.init();
</script>
</body>
</html>