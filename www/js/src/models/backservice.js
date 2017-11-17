var Ajax = {
	req: null,
	makeBaseAuth: function(){
		var auth = Utils.Storage.getItem('auth');
		var token = auth.token;
		return "Bearer " + token;
	},
	makeRefreshAuth: function(){
		var auth = Utils.Storage.getItem('auth');
		var refreshToken = auth.refreshToken;
		return "Bearer " + refreshToken;
	},
	prepareData: function(data) {
		data = typeof data === 'undefined' ? {} : data;
		return data;
	},
	prepareJson: function(method, data) {
		data = typeof data === 'undefined' ? {} : data;
		if(method == "GET"){
			if(_.isEmpty(data)){
				return "";
			}else{
				return JSON.stringify(data);
			}
		}
		if(method == "POST"){
			return JSON.stringify(data);
		}
	},
	go: function(params) {
		var paramsThis = params;
		paramsThis.dataType = 'json';
		paramsThis.timeout = 60000;
		paramsThis.crossDomain = true;
		paramsThis.data = this.prepareData(params.data);
		$.ajax(paramsThis);
		return false;
	},
	goJson: function(params) {
		var paramsThis = params;
		paramsThis.dataType = 'json';
		paramsThis.timeout = 60000;
		paramsThis.crossDomain = true;
		paramsThis.contentType = "application/json;charset=UTF-8";
		paramsThis.data = this.prepareJson(params.method, params.data);
		$.ajax(paramsThis);
		return false;
	},
	goWithAbort: function(params) {
		var paramsThis = params;
		paramsThis.type = 'POST';
		paramsThis.dataType = 'json';
		paramsThis.timeout = 60000;
		paramsThis.data = this.prepareData(params.data);
		paramsThis.contentType = "application/json;charset=UTF-8";
		if (this.req != null) this.req.abort();
		this.req = $.ajax(paramsThis);
		return false;
	},

}

var BackServices = {
	request: null,
	getCompanies: function(successCallback){
		var self = this;

		Ajax.go({
			url: Config.servicesUrl() + "/api/companies",
			method: "GET",
			data: {},
			success: function (response) {
				if(response.success == 1) {
					successCallback(response.data);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				self.errorEvent(jqXHR, textStatus, errorThrown);
			}
		});
	},
	addCompany: function(params, successCallback){
		var self = this;

		Ajax.go({
			url: Config.servicesUrl() + "/api/companies/add",
			method: "POST",
			data: {
				name: params.companyName,
				quota: params. companyQuota
			},
			success: function (response) {
				successCallback(response);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				self.errorEvent(jqXHR, textStatus, errorThrown);
			}
		});
	},
	updateCompany: function(params, successCallback){
		var self = this;

		Ajax.go({
			url: Config.servicesUrl() + "/api/companies/update",
			method: "POST",
			data: {
				id: params.companyId,
				name: params.companyName,
				quota: params. companyQuota
			},
			success: function (response) {
				successCallback(response);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				self.errorEvent(jqXHR, textStatus, errorThrown);
			}
		});
	},
	removeDepartment: function(id, successCallback){
		var self = this;

		Ajax.go({
			url: Config.servicesUrl() + "/api/companies/delete",
			method: "DELETE",
			data: {
				id: id
			},
			success: function (response) {
				successCallback(response);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				self.errorEvent(jqXHR, textStatus, errorThrown);
			}
		});
	},
	errorEvent: function(jqXHR, textStatus, errorThrown){
		Utils.Loading.hide();

		if (jqXHR.status == 400) {
			Utils.Popup.show("error", "Ошибка " + textStatus, jqXHR.statusText, undefined, jqXHR.responseText);
		} else if (jqXHR.status == 401) {
			App.exit();
		} else {
			var responseText = "url: "+jqXHR.responseURL + "<br>type: " +jqXHR.responseType;
			responseText += (jqXHR.hasOwnProperty('responseText')) ? jqXHR.responseText : '';
			responseText += "<br>"+ errorThrown
			Utils.Popup.show("error", "Ошибка " + textStatus, "ошибка доступа к сервису", undefined, responseText);
		}
	},

}