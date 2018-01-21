var books = [{id: 1,title: 'Repurpose Content to Reach a Wider Audience', site: '97thfloor.com', time: '2 hours ago', mpaa: 'G'},
{id: 2,title: '14 Useful Sites for Designers', site: 'devgarage.com', time: '2 hours ago', mpaa: 'PG'},
{id: 3,title: 'TrendPaper - What&apos;s Trending in the World', site: '97thfloor.com', time: '2 hours ago', mpaa: 'PG-13'},
{id:4 ,title: 'Dramatically Raise the Value of Any Piece of Content with These 27 Tactics', site: 'searchenginewatch.com', time: '2 hours ago', mpaa: 'R'}];
var app = angular.module('mainApp', ['ngRoute','ngResource']);
    app.config(function($routeProvider,$locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
  requireBase: false
        });
      $routeProvider
      .when("/", {templateUrl : "partials/books", controller: "mainCtrl"})
      //.when("/:id", {templateUrl : "partials/book", controller: "bookCtrl"})
      .otherwise({ redirectTo :'/'});
  });

  app.controller('mainCtrl', function ($http, $scope) {
    $scope.siteName = 'Books';
    $scope.navs = [{Link: '/Books',Text: 'Books'},{Link: '/Authors',Text: 'Authors'}];
    $scope.books = books;
  });

  app.controller('bookCtrl', function($scope,$routeParams){
      $scope.book = books[$routeParams.id-1];
  })