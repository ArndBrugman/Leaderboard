var app = angular.module('Leaderboard', ['ngAnimate']);


(function () {

app

.controller('LeaderboardController', function($scope, $http) {
  Test = {
    "name": "Applied Innovation Battle",
    "url": "https://www.facebook.com/AppliedInnovationBattle",
    "Badges": {
      "Liked": "Gray",
      "Active": "Bronze",
      "Diverse": "Silver",
      "Social": "Gold",
      "Frontrunner": "Platinum",
      "Marketeer": "Diamond"
    }
  }
  $scope.Teams = [  ];

  $http.get('Teams.json').success(function(data, status, headers, config) {
    $scope.Teams = data.Teams;
    if (window.location.href.toLowerCase().indexOf("/?test")>0)
      $scope.Teams.push(Test);
    for (TeamNr in $scope.Teams) {
      //console.log($scope.Teams[TeamNr]);
      $scope.Teams[TeamNr].Points = 0;
      for (Badge in $scope.Teams[TeamNr].Badges) {
        //console.log(Badge, $scope.Teams[TeamNr].Badges[Badge]);
        if ($scope.Teams[TeamNr].url != ""   ) $scope.Teams[TeamNr].Points += 0.01;
        if ($scope.Teams[TeamNr].Badges[Badge] === "Bronze"   ) $scope.Teams[TeamNr].Points += 1;
        if ($scope.Teams[TeamNr].Badges[Badge] === "Silver"   ) $scope.Teams[TeamNr].Points += 2;
        if ($scope.Teams[TeamNr].Badges[Badge] === "Gold"     ) $scope.Teams[TeamNr].Points += 4;
        if ($scope.Teams[TeamNr].Badges[Badge] === "Platinum" ) $scope.Teams[TeamNr].Points += 6;
        if ($scope.Teams[TeamNr].Badges[Badge] === "Diamond"  ) $scope.Teams[TeamNr].Points += 8;
      }
    }
    window.Teams = $scope.Teams;
  })
  .error(function(data, status, headers, config) {
    $scope.Teams = [
  {
  	'name': 'Unable to load Teams.json',
  	'url': 'www',
  }, ];
  });
    
  $scope.random = function() {
      return 0.5 - Math.random();
  }

});



})();
