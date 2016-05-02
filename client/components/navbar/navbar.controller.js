'use strict';

angular.module('adventureJS')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];
    
    $scope.isRole = Auth.isRole;
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    
    if(Auth.isLoggedIn){
      $scope.capitalRole = $scope.getCurrentUser().role;
      if($scope.capitalRole){
        $scope.capitalRole = $scope.capitalRole.charAt(0).toUpperCase() + $scope.capitalRole.slice(1);
      }
    }

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });