'use strict';

angular.module('myAPP.index', ['ngRoute'])

/*.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'index.html',
    controller: 'IndexCtrl'
  });
}])*/

.controller('IndexCtrl', ['$rootScope','$scope', 'Authenticate', 'Feed', function($rootScope,$scope,Authenticate,Feed) {
	Authenticate.confirmLoggedIn();
	    $(".navbar-nav").show();

	$scope.logout = function () {
	    	Authenticate.logout()
	                .then(function () {
	                	UserHistory.logout($rootScope.currentuser._id);
	                	console.log('LOGOUT = OK');
	                    $location.path('/login');
	                })
	                .catch( function (err) {
	                	console.log('LOGOUT = NOK' + err);
	                });
	}

	Feed.getNotificationFeed(window.localStorage['currentUser'], {
		id: window.localStorage['currentUser']
		})
		.then(function(data) {
		 	console.log(data);
		}) 
		.catch( function(err) {
            
            console.log('Error : ' +JSON.stringify(err));
	});

	}]);
