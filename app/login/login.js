'use strict';

angular.module('myAPP.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'Authenticate','UserHistory',function($rootScope, $scope,$location, Authenticate,UserHistory) {
	$scope.user={};
	$scope.error = {};
	    $(".navbar-nav").hide();
	$scope.loginApp =  function (form) {
	console.log($scope.user.username + ' ' + $scope.user.password);
	console.log(JSON.stringify($scope.user));
	console.log("login");
	Authenticate.login({
			username: $scope.user.username,
			password: $scope.user.password
		})
		.then(function(data) {
			console.log('Login = OK');
			//console.log(data);
			UserHistory.login(data._id,data.username);
			//NotificationClient.register();
			
			$location.path('/view1');
		}) 
		.catch( function(err) {
            
            $scope.error.message = err.data.message;
            console.log('Login = NOK : ' +JSON.stringify(err));
	    //console.log($scope.error.message);
        });
	};
}]);
