String.prototype.replaceAll = function (find, replace) {
	var str = this;
	return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};

Number.prototype.roundPlus = function(n) {
	if(isNaN(n)) return false;
	var m = Math.pow(10, n);
	return Math.round(this * m) / m;
};

Number.prototype.format = function(n, x, s, c) {
	var num = this + '';
	var x = num.split(c);
	var x1 = x[0];
	var x2 = x.length > 1 ? c + x[1] : '';

	var x22 = parseFloat(x2).toFixed(Math.max(0, ~~n));

	var x222 = x22.split(c);
	x2 = x222.length > 1 ? c + x222[1] : '';

	var rgx = /(\d+)(\d{3})/;

	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + s + '$2');
	}
	return x1 + x2;
};

var Debug = {
	enable: Config.debug,
	show: function(message){
		if(Debug.enable){
			console.log(message);
		}
	}
};

var Utils = {
	Loading:{
		show: function(){
			$(".loader").show();
		},
		hide: function(){
			$(".loader").hide();
		}
	},
	Popup:{
		show: function(type, title, message, focusElm, detailMessage){
			switch (type){
				case "error":
					$('#modalDialog .modal-header').removeClass("alert-warning");
					$('#modalDialog .modal-header').removeClass("alert-info");
					$('#modalDialog .modal-header').removeClass("alert-success");
					$('#modalDialog .modal-header').addClass("alert-danger");
					break;
				case "warning":
					$('#modalDialog .modal-header').removeClass("alert-danger");
					$('#modalDialog .modal-header').removeClass("alert-info");
					$('#modalDialog .modal-header').removeClass("alert-success");
					$('#modalDialog .modal-header').addClass("alert-warning");
					break;
				case "info":
					$('#modalDialog .modal-header').removeClass("alert-danger");
					$('#modalDialog .modal-header').removeClass("alert-warning");
					$('#modalDialog .modal-header').removeClass("alert-success");
					$('#modalDialog .modal-header').addClass("alert-info");
					break;
				case "success":
					$('#modalDialog .modal-header').removeClass("alert-danger");
					$('#modalDialog .modal-header').removeClass("alert-warning");
					$('#modalDialog .modal-header').removeClass("alert-info");
					$('#modalDialog .modal-header').addClass("alert-success");
					break;
				default:
					break;
			}
			$('#modalDialog .modal-title').html(title);
			$('#modalDialog .modal-body div#shortMessage').html("<p>"+message+"</p>");
			if(detailMessage !== undefined) {
				$('#modalDialog .modal-body a.btn').show();
				$('#modalDialog .modal-body div#detailMessage').html("<p>" + detailMessage + "</p>");
			}
			$('#modalDialog').modal('show');
			$('.modal-dialog').draggable({
				handle: ".modal-header"
			});
			$('#modalDialog').on('shown.bs.modal', function () {
				$('#modalDialog').find('#btnClose').unbind('click').bind('click', function() {
					$('#modalDialog').modal('hide');
				});
			})
			$('#modalDialog').on('hidden.bs.modal', function () {
				if(focus !== undefined){
					$(focusElm).focus();
				}
			})
		},
		confirm: function(type, message, callbackOk, callbackCancel, btnOkName, btnCancelName){
			// console.log(type, title, message);
			switch (type){
				case "danger":
				case "error":
					$('#modalConfirm .modal-header').removeClass("alert-warning");
					$('#modalConfirm .modal-header').removeClass("alert-info");
					$('#modalConfirm .modal-header').removeClass("alert-success");
					$('#modalConfirm .modal-header').addClass("alert-danger");
					break;
				case "warning":
					$('#modalConfirm .modal-header').removeClass("alert-danger");
					$('#modalConfirm .modal-header').removeClass("alert-info");
					$('#modalConfirm .modal-header').removeClass("alert-success");
					$('#modalConfirm .modal-header').addClass("alert-warning");
					break;
				case "info":
					$('#modalConfirm .modal-header').removeClass("alert-danger");
					$('#modalConfirm .modal-header').removeClass("alert-warning");
					$('#modalConfirm .modal-header').removeClass("alert-success");
					$('#modalConfirm .modal-header').addClass("alert-info");
					break;
				case "success":
					$('#modalConfirm .modal-header').removeClass("alert-danger");
					$('#modalConfirm .modal-header').removeClass("alert-warning");
					$('#modalConfirm .modal-header').removeClass("alert-info");
					$('#modalConfirm .modal-header').addClass("alert-success");
					break;
				default:
					break;
			}
			$('#modalConfirm .modal-title').html("Внимание");
			$('#modalConfirm .modal-body').html("<p>"+message+"</p>");
			$('#modalConfirm').modal('show');
			$('.modal-dialog').draggable({
				handle: ".modal-header"
			});

			if(btnOkName !== undefined){
				$('#modalConfirm').find('#btnOk').text(btnOkName);
			}

			if(btnCancelName !== undefined){
				$('#modalConfirm').find('#btnCancel').text(btnCancelName);
			}

			$('#modalConfirm').on('shown.bs.modal', function (e) {
				e.preventDefault();
				$('#modalConfirm').find('#btnCancel').unbind('click').bind('click', function(event) {
					callbackCancel();
					$('#modalConfirm').modal('hide');
				});
				$('#modalConfirm').find('#btnOk').unbind('click').bind('click', function(event) {
					// event.preventDefault();
					callbackOk();
					$('#modalConfirm').modal('hide');
				});
			})
		}
	},

	Storage: {
		setItem: function (item, data) {
			localStorage.setItem(item, JSON.stringify(data));
		},
		getItem: function (item) {
			return JSON.parse(localStorage.getItem(item));
		},
		removeItem: function(item){
			localStorage.removeItem(item);
		},
		clear: function () {
			localStorage.clear();
		}
	},
	Date: {
		getMaxDate: function(y, m) {
			if (m == 1) {
				return y%4 || (!(y%100) && y%400 ) ? 28 : 29;
			};
			return m===3 || m===5 || m===8 || m===10 ? 30 : 31;
		},
		getTimeStamp: function(){
			return new Date().getTime();
		},
		getTimeStampFromDate: function(date){
			return new Date(date).getTime();
		},
		getFormat: function (date) {
			var dateObj = new Date(date);
			var date = dateObj.toLocaleDateString('ru-RU', {
				day : 'numeric',
				month : 'numeric',
				year : 'numeric',
			}).split(' ').join('.');
			var time = dateObj.toLocaleTimeString();
			return date+" "+time;
		},
		getFormatForFilename: function (date) {
			var tmp = date.split(".");
			var dt = tmp[0];
			var datetime = dt.split(" ");
			var dateArr = datetime[0].split("-");
			var time = datetime[1].split(":");
			var d = parseInt(dateArr[2]);
			var m = dateArr[1];
			var y = dateArr[0];
			var h = time[0];
			var i = time[1];
			var s = time[2];
			return '' + y + '-' + m + '-' + (d <= 9 ? '0' + d : d) + "-"+ h + ""+ i +""+ s;
		},
		getFromString: function (date) {
			var tmp = date.split(".");
			var dt = tmp[0];
			var datetime = dt.split(" ");
			var dateArr = datetime[0].split("-");
			var time = datetime[1].split(":");
			var d = parseInt(dateArr[2]);
			var m = dateArr[1];
			var y = dateArr[0];
			var h = time[0];
			var i = time[1];
			var s = time[2];
			// return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d) + " "+ h + ":"+ i +":"+ s;
			return '' + y + '-' + m + '-' + (d <= 9 ? '0' + d : d) + " "+ h + ":"+ i +":"+ s;
		},
		dateToYMDShort: function(date) {
			var d = date.getDate();
			var m = date.getMonth() + 1;
			var y = date.getFullYear();
			return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
		},
		dateToYMD: function(date) {
			var d = date.getDate();
			var m = date.getMonth() + 1;
			var y = date.getFullYear();
			var h = date.getHours();
			var i = date.getMinutes();
			var s = date.getSeconds();
			return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d) + " "+ (h <= 9 ? '0' + h : h) + ":"+ (i <= 9 ? '0' + i : i) +":"+ (s <= 9 ? '0' + s : s);
		}
	},
	Cookie: {
		createCookie: function (name, value, min) {
			if (min) {
				var date = new Date();
				date.setTime(date.getTime() + (min * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
			}
			else var expires = "";

			document.cookie = name + "=" + value + expires + "; path=/";
		},
		readCookie: function (name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		},
		eraseCookie: function (name) {
			Helper.utilts.createCookie(name, "", -1);
		},
	}
}
