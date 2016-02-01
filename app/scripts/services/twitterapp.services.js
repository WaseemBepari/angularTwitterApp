(function(){
    'use strict';
  /**
 * twitterAngularApp.services Module
 *
 * Description
 */
angular.module('twitterAngularApp.services', []);

angular
    .module('twitterAngularApp.services')
    .factory('twitterServiceApi', twitterServiceApi);
    
twitterServiceApi.$inject = ['$q'];

function twitterServiceApi($q) {
    var authorizationResult = false;

    function setAuth(token) {
        if (token) {
            this.authorizationResult = token;
        }
    }

    function getAuth() {
        return this.authorizationResult;
    }

    function connectTwitter() {
        var deferred = $q.defer(),
            _self = this;
        OAuth.popup('twitter', {
            cache: true
        }, function(error, result) { 
        //cache means to execute the callback if the tokens are already present
            if (!error) {
                _self.authorizationResult = result;
                deferred.resolve();
            }
        });
        return deferred.promise;
    }

    function getLatestTweets(maxId) {
        //create a deferred object using Angular's $q service
        var deferred = $q.defer();
        var url = '/1.1/statuses/home_timeline.json';
        if (maxId) {
            url += '?max_id=' + maxId;
        }
        this.authorizationResult.get(url).done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
            //when the data is retrieved resolve the deferred object
            deferred.resolve(data);
        }).fail(function(err) {
            //in case of any error we reject the promise with the error object
            deferred.reject(err);
        });
        //return the promise of the deferred object
        return deferred.promise;
    }

    function getUserDetails(maxId) {
        //create a deferred object using Angular's $q service
        var deferred = $q.defer();
        var url = '/1.1/account/verify_credentials.json';
        if (maxId) {
            url += '?max_id=' + maxId;
        }
        this.authorizationResult.get(url).done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
            //when the data is retrieved resolve the deferred object
            deferred.resolve(data);
        }).fail(function(err) {
            //in case of any error we reject the promise with the error object
            deferred.reject(err);
        });
        //return the promise of the deferred object
        return deferred.promise;
    }

    function getUserFollowers(userId) {
        //create a deferred object using Angular's $q service
        var deferred = $q.defer();
        var url = '/1.1/followers/list.json';
        if (userId) {
            url += '?user_id=' + userId;
        }
        this.authorizationResult.get(url).done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
            //when the data is retrieved resolve the deferred object
            deferred.resolve(data);
        }).fail(function(err) {
            //in case of any error we reject the promise with the error object
            deferred.reject(err);
        });
        //return the promise of the deferred object
        return deferred.promise;
    }

    function logOut() {
        OAuth.clearCache('twitter');
        this.authorizationResult = false;
    }

    return {
        setAuth: setAuth,
        getAuth: getAuth,
        connectTwitter: connectTwitter,
        getLatestTweets: getLatestTweets,
        getUserDetails: getUserDetails,
        getUserFollowers: getUserFollowers,
        logOut: logOut
    };
}  
})();
