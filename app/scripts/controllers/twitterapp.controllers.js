(function() {
    'use strict';

    /**
     * twitterAngularApp.controllers Module
     *
     * Description
     */
    angular.module('twitterAngularApp.controllers', []);

    angular
        .module('twitterAngularApp.controllers')
        .controller('TwitterController', TwitterController);

    /**
     * this ctrl is used to display user timeline
     * @param  {[type]} twitterServiceApi this service is used to fetch data from twitter api
     */
    
    TwitterController.$inject = ['twitterServiceApi'];
    function TwitterController(twitterServiceApi) {
        var vm = this;
        vm.tweets = []; //array of tweets


        //using the OAuth authorization result get the latest 20 tweets from twitter for the user
        vm.refreshTimeline = function(maxId) {
            vm.loading = true;
            twitterServiceApi.getLatestTweets(maxId).then(function(data) {
                vm.tweets = vm.tweets.concat(data);
                vm.loading = false;
            }, function() {
                vm.rateLimitError = true;
            });
        };


        //if the user is a returning user, display the tweets
        if (twitterServiceApi.getAuth()) {
            vm.refreshTimeline();
        }

    }
})();