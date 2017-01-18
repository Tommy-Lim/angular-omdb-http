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
      url: 'http://api.giphy.com/v1/gifs/search',
      method: "GET",
      params: {
        q: $scope.searchTerm,
        api_key: "dc6zaTOxFJmzC"
      }
    };

    $http(req).then(function success(res) {
      console.log("HTTP success:", res.data.data);
      if (res.data.Error === "Movie not found!") {
        $scope.results = [];
      } else {
        $scope.results = res.data.data;
      }
    }, function failure(res) {
      $scope.results = [];
      console.log("HTTP failed:", res);
    });
  };
}]);
