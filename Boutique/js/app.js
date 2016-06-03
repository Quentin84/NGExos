var monApp = angular.module('monApp', ['ngRoute', 'angular.filter']);

//ROUTES
monApp.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
    })
        .when('/article', {
            templateUrl: 'pages/article.html',
            controller: 'articleController'
    }).when('/article/:id', {
            templateUrl: 'pages/article.html',
            controller: 'articleController'
    })
        .otherwise({redirectTo: '/'})
});
//CONTROLLERS
monApp.controller('homeController', [ "$scope", "$log", "$http", '$filter', function($scope,$log, $http,$filter) {
  
    $http.get('data/templates.json')
        .success(function(resultat){
            $scope.articles= resultat;
            $log.info($scope.articles);
            $scope.filteredArticles = $scope.articles;
    }) 
        .error(function(data, status){
            console.log(data);
    });
    $scope.$watch('catchoisie', function(){
        if($scope.catchoisie){
            $scope.filteredArticles = $filter('filter')($scope.articles, function(articles){
                return articles.categorie == $scope.catchoisie.categorie
            });
            $log.info($scope.filteredArticles);
        }else{
            $scope.filteredArticles = $scope.articles;
            $log.warn($scope.filteredArticles);
        }
    });
}]);
monApp.controller('articleController', ["$scope", "$log", "$routeParams", "$http", "$filter", function($scope, $log, $routeParams,$http,$filter){
    
    var templateId = $routeParams.id;
    $http.get('data/templates.json')
        .success(function(resultat){
            $scope.article = $filter('filter')(resultat, function(resultat){
                return resultat.id == templateId;
            })[0];
            $log.info($scope.article);
        })
        .error(function (data, status){
        $log.error(data);     
        });
    
}]);

//SERVICES
