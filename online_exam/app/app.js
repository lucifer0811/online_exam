var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      title: 'OnlineExam',
      templateUrl: 'partials/online_exams.html',
      controller: 'online_examsCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });;
}]);

