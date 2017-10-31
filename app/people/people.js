'use strict';

angular.module('myAPP.people', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/people', {
    templateUrl: 'people/people.html',
    controller: 'PeopleCtrl'
  });
}])

.controller('PeopleCtrl', ['$rootScope','$scope','People','Authenticate',function($rootScope,$scope,People,Authenticate) {	
	Authenticate.confirmLoggedIn();
$scope.error = {};
	$scope.people=[];
	    $(".navbar-nav").show();

	People.getAll(window.localStorage['currentUser']).then(function(data) {
			console.log(data.data.people);
			console.log(data.data.follows);

			data.data.people.forEach(function(person,idx){
				$scope.people[idx] = {'_id' : '','username':'','password':'','follows':''};	
				$scope.people[idx]._id = data.data.people[idx]._id;
				$scope.people[idx].username = data.data.people[idx].username;
				$scope.people[idx].password = data.data.people[idx].password;
				$scope.people[idx].follows = false;
			});
			//$scope.people = data.data.people; 


			data.data.follows.forEach(function(follow,idx1){

				$scope.people.forEach(function(person,idx){
					if(data.data.follows[idx1].target == $scope.people[idx]._id)
					{
						console.log(true);
						$scope.people[idx].follows=true;
					}		
				});
			});	
			//UserHistory.login(data._id);
			//NotificationClient.register();
			
			//$location.path('/people');

			console.log($scope.people);
		}) 
		.catch( function(err) {
            
            //$scope.error.message = err.data.message;
            console.log(JSON.stringify(err));
	    //console.log($scope.error.message);
        });
	
	$scope.follow = function(userid){
		People.follow(userid, window.localStorage['currentUser']).then(function(data){
			$scope.people.forEach(function(data1,idx){
				if($scope.people[idx]._id == data.data.follow.id)
				{	
					$scope.people[idx].follows=true;
				}
			});
			console.log(data.data.follow.id);
			
		});
	};

}]);
