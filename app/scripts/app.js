(function() {
	'use strict';

	/**
	 * twitterAngularApp Module
	 * this is the main app and here is where app the sub modules are added
	 */
	angular
		.module('twitterAngularApp', [
			'ui.router',
			'ngSanitize',
			'twitterAngularApp.appConfig',
			'twitterAngularApp.services',
			'twitterAngularApp.dashboard.controllers',
			'twitterAngularApp.login.controllers',
			'twitterAngularApp.controllers'
		]);
})();