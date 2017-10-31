'use strict';

// Declare app level module which depends on views, and components
/*



*/
angular.module('myAPP', [
  'ngRoute',
'ngResource',
'myAPP.feed',
  'myAPP.aggfeed',
  'myAPP.login',
  'myAPP.people',
  'myAPP.index',
'myAPP.configs',
'myAPP.services',
  'myAPP.version'
 ])

.run(function($rootScope,$location,  UserHistory) {
  console.log("Starting app.run");
  UserHistory.retrieveLogin();
})


.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
//  MQTTProvider.setHref('mqtt://test.mosquitto.org');
 // UserHistory.retrieveLogin();

  $routeProvider.otherwise({redirectTo: '/feed'});

}]);
