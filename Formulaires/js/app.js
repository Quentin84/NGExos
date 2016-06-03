var monApp = angular.module('monApp', ['ngMessages', 'ui.mask']);

monApp.controller('controleurPrincipal', [ "$scope", "$log", function($scope,$log) {
  
  $scope.affiche = function(){
      $log.info($scope.nom)
  }
}]);