var Config = {

	app: {
		appName: "VPN-UI",
		partName: "VPN administrator panel",
		version: "версия 1.0",
	},

	environment: "dev",

	debug: true,

	baseDevUrl: "http://DOMAIN",
	baseProdUrl: "http://DOMAIN",

	servicesUrl: function() {
		return (this.environment != "dev") ? this.baseProdUrl: this.baseDevUrl;
	},

};