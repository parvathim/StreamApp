'use strict';

angular.module('myAPP.feed', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/feed', {
    templateUrl: 'feed/feed.html',
    controller: 'FeedCtrl'
  });
}])

.controller('FeedCtrl', ['$rootScope','$scope', 'Authenticate', 'Feed', function($rootScope,$scope,Authenticate,Feed) {
	    Authenticate.confirmLoggedIn();
	    $(".navbar-nav").show();
	    $scope.tweet = {};
	    $scope.feeds=[];
	    $scope.tweettext = function(form){
		//console.log($scope.tweet);
		Feed.createFeed(window.localStorage['currentUser'], {
			text: $scope.tweet.message,
			user: window.localStorage['currentUser'],
			verb: "tweet",
			object: 1
		})
		.then(function(data) {
			//console.log(data);
var dataFin = {};
			dataFin.id = data._id;
			dataFin.user = data.user;
			dataFin.text = data.text;
			//console.log(dataFin);
			$scope.feeds.push(dataFin);
		$scope.tweet.message = "";
			//console.log(data);
			//UserHistory.login(data._id);
			//NotificationClient.register();
			
			//$location.path('/view1');
		}) 
		.catch( function(err) {
            
            $scope.error.message = err.data.message;
            console.log('Login = NOK : ' +JSON.stringify(err));
	    //console.log($scope.error.message);
        });
	}

	Feed.getFlatFeed(window.localStorage['currentUser'])
		.then(function(data) {
//			var dataFin = {};
		    //$scope.feeds = [
			//console.log(data.activities);
			data.activities.forEach(function(activity, idx){
				var dataFin = {};
				if(!(data.activities[idx].verb==="Follow"))
				{
					dataFin.id = data.activities[idx].object._id;
					dataFin.user = data.activities[idx].object.user;
					dataFin.text = data.activities[idx].object.text;
		//			console.log(dataFin);
					$scope.feeds.push(dataFin);
				}
			});
			//console.log(data);
			//UserHistory.login(data._id);
			//NotificationClient.register();
			
			//$location.path('/view1');
		}) 
		.catch( function(err) {
            
            $scope.error.message = err.data.message;
            console.log('Error : ' +JSON.stringify(err));
	    //console.log($scope.error.message);
        });

	
}]);
