(function() {
    'use strict';

    /**
     * twitterAngularApp.controllers Module
     *
     * Description
     */
    angular.module('twitterAngularApp.dashboard.controllers', []);

    angular
        .module('twitterAngularApp.dashboard.controllers')
        .controller('dashboardController', dashboardController);

    /**
     * this ctrl is used to display user profile related data 
     * @param  {[type]} $state  this service is used to manage redirection
     * @param  {[type]} twitterServiceApi this service is used to fetch data from twitter api
     * @return {[dashboardController]} return an instantise of the ctrl
     */
    dashboardController.$inject = ['$state','twitterServiceApi'];
    
    function dashboardController($state, twitterServiceApi) {
        var vm = this;


        //using the OAuth authorization result get the latest 20 tweets from twitter for the user
        (function() {
            twitterServiceApi.getUserDetails().then(function(data) {
                vm.userInfo = data;
                twitterServiceApi.getUserFollowers(data.id).then(function(data) {
                    vm.userFollowers = data;
                }, function() {
                    vm.rateLimitError = true;
                });
            }, function() {
                vm.rateLimitError = true;
            });
        })();

        this.signOut = function() {
            twitterServiceApi.logOut();
            $state.go('signIn');
        };
    }
})();