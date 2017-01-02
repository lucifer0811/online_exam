var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      title: 'OnlineExam',
      templateUrl: 'partials/categories.html',
      controller: 'categoriesCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });;
}]);

