var app = angular.module("MovieApp", []);
app.controller("MovieCtrl", ["$scope", "$http",
    function($scope, $http) {
  $scope.searchTerm = 'Deer Hunter';
  $scope.results = undefined;

  $scope.$watch('searchTerm', function(newVal, oldVal) {
    $scope.search();
  });

  $scope.search = function() {
    var req = {
      url: 'http://www.omdbapi.com',
      method: "GET",
      params: {
        s: $scope.searchTerm
      }
    }

    $http(req).then(function success(res) {
      console.log("HTTP success:", res);
      if (res.data.Error === "Movie not found!") {
        $scope.results = [];
      } else {
        $scope.results = res.data.Search;
      }
    }, function failure(res) {
      $scope.results = [];
      console.log("HTTP failed:", res);
    });
  }
}]);
