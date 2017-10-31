'use strict';

angular.module('myAPP.aggfeed', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/aggfeed', {
    templateUrl: 'aggfeed/aggfeed.html',
    controller: 'AggfeedCtrl'
  });
}])

.controller('AggfeedCtrl', ['$rootScope','$scope', 'Authenticate', 'Feed', function($rootScope,$scope,Authenticate,Feed) {
		    Authenticate.confirmLoggedIn();
	    $(".navbar-nav").show();
		$scope.feeds = [];
		Feed.getAggFeed(window.localStorage['currentUser'])
		.then(function(data) {
			//console.log(data);

			data.activities.forEach(function(activity, idx){
				$scope.activities = [];	
				var dataFeed = {};
				data.activities[idx].activities.forEach(function(activity, idx1){
					var dataFin = {};

					if(!(data.activities[idx].activities[idx1].verb==="Follow"))
					{
						dataFin.type="Tweet";
						dataFin.id = data.activities[idx].activities[idx1].object._id;
						dataFin.user = data.activities[idx].activities[idx1].object.user;
						dataFin.text = data.activities[idx].activities[idx1].object.text;
						$scope.activities.push(dataFin);
					}
					else 
					{
						dataFin.type="Follow";
						dataFin.username = data.activities[idx].activities[idx1].actor.username;
						dataFin.id = idx1;
						$scope.activities.push(dataFin);
					}

				});
				
				dataFeed.type = data.activities[idx].verb;
				dataFeed.activities = $scope.activities;
				$scope.feeds.push(dataFeed);
				
			});

			
			//console.log(data);
			//UserHistory.login(data._id);
			//NotificationClient.register();
			
			//$location.path('/view1');
		}) 
		.catch( function(err) {
            
            $scope.error.message = err.data.message;
            console.log('Error : ' +JSON.stringify(err));
	   // console.log($scope.error.message);
        });
console.log($scope.feeds);
}]);
