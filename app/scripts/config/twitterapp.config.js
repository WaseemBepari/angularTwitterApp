(function() {
	'use strict';

	/**
	 * twitterAngularApp.services Module
	 *
	 * Description
	 */
	angular.module('twitterAngularApp.appConfig', []);

	angular
		.module('twitterAngularApp.appConfig')
		.config(appConfig)
		.run(twitterAppInitialize);


	/**
	 * this method is used to setup and run the authencation process when app bootstrap's
	 * @param  {[type]} $state  this service is used to manage redirection
     * @param  {[type]} twitterServiceApi this service is used to fetch data from twitter api
	 * @param  {[type]} $rootScope  this service used to watch event like state change
	 */
	
    twitterAppInitialize.$inject = ['$state','twitterServiceApi','$rootScope'];

	function twitterAppInitialize($state, twitterServiceApi, $rootScope) {
		//initialize OAuth.io with public key of the application
		OAuth.initialize('bwb8-Swadu-GEkIrA6m64SMi9kw', {
			cache: true
		});
		//try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again
		twitterServiceApi.setAuth(OAuth.create('twitter'));


		if (!twitterServiceApi.getAuth()) {
			$state.go('signIn');
		} else {
			$state.go('dashboard.timeline');
		}

		$rootScope.$on('$stateChangeStart', function(e, toState) {

			var isLogin = toState.name === 'signIn';
			if (isLogin) {
				return; // no need to redirect 
			}

			// now, redirect only not authenticated
			if (!twitterServiceApi.getAuth()) {
				e.preventDefault(); // stop current execution
				$state.go('signIn'); // go to login
			}
		});
	}


	/**
	 * this is method is used to configure the app like states, default routes etc
	 * @param  {[type]} $stateProvider     [description]
	 * @param  {[type]} $urlRouterProvider [description]
	 * @return {[type]}                    [description]
	 */
	
    appConfig.$inject = ['$stateProvider','$urlRouterProvider'];

	function appConfig($stateProvider, $urlRouterProvider) {

		// For any unmatched url, redirect to /signin
		$urlRouterProvider.otherwise('/signin');

		// Now set up the states
		$stateProvider
			.state('signIn', {
				url: '/signin',
				templateUrl: 'views/signin.html',
				controller: 'loginController',
				controllerAs: 'twttrLogin'

			})
			.state('dashboard', {
				url: '/dashboard',
				templateUrl: 'views/dashboard.html',
				controller: 'dashboardController',
				controllerAs: 'dashBoard'
			})
			.state('dashboard.timeline', {
				url: '/timeline',
				views: {
					'mainContainer': {
						templateUrl: 'views/dashboard.timeline.html',
						controller: 'TwitterController',
						controllerAs: 'twttrTweets'
					},
				}
			});
	}
})();