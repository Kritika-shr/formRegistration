var myApp = angular.module('myApp',
	['ngRoute','firebase'])
	.constant('FIREBASE_URL', 'https://ng-reg90.firebaseio.com/');

 myApp.run(['$rootScope', '$location',
  function($rootScope, $location) {
    $rootScope.$on('$routeChangeError',
      function(event, next, previous, error) {
        if (error=='AUTH_REQUIRED') {
          $rootScope.message = 'Sorry, you must log in to access that page';
          $location.path('/login');
        } // AUTH REQUIRED
      }); //event info
  }]); //run


myApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/login',{
		templateUrl : 'partials/login.html',
		controller:'RegisterController'
	}).
	when(
		'/register',{
			templateUrl:'partials/register.php',
			controller:'RegisterController'
	}).
	when(
		'/success',{
		templateUrl:'partials/success.html',
		controller:'SuccessController',
		resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } //current Auth
      } //resolve

	}).
	otherwise({
		redirectTo:'/login'  
	});
}]);
