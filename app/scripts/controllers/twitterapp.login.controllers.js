(function() {
    'use strict';
    /**
     * twitterAngularApp.controllers Module
     *
     * Description
     */
    angular.module('twitterAngularApp.login.controllers', []);

    angular
        .module('twitterAngularApp.login.controllers')
        .controller('loginController', loginController);

        
    /**
     * this ctrl is used to manage login 
     * @param  {[type]} $state  this service is used to manage redirection
     * @param  {[type]} twitterServiceApi this service is used to fetch data from twitter api
     * @return {[loginController]} return an instantise of the  loginController ctrl
     */
    loginController.$inject = ['$state','twitterServiceApi'];
    
    function loginController($state, twitterServiceApi) {
        var vm = this;
        //when the user clicks the connect twitter button, the popup authorization window opens
        vm.connectButton = function() {
            twitterServiceApi
                .connectTwitter()
                .then(function() {
                    if (twitterServiceApi.getAuth()) {
                        //if the authorization is successful, hide the connect button and display the tweets
                        $state.go('dashboard.timeline');
                    }
                });
        };

    }

})();