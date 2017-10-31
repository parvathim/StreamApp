angular.module('myAPP.configs', []).
    constant('apiUrls', (function() {
        var base, base2, protocol;

        //base = 'http://192.169.1.104:3000/';
        //base = 'http://192.168.1.60:3000/';
        //base = 'http://54.255.174.220/';
        //base = 'https://www.viosdemo.com/';
	base = 'http://localhost:4040/';
        //console.log("api base: ",base);

       // base2 = 'api/v1/';

        return {
            login:      base+ 'login/',
            people:      base+ 'people/',
	    follow:      base+ 'follow/',
	    activity:      base+ 'activity/',
	    flat:      base+ 'flat/',
	    aggfeed:      base+ 'aggregated_feed/',
	    notiffeed:      base+ 'notification_feed/',

            bucket:             'stream' 

        }
    })());
//
