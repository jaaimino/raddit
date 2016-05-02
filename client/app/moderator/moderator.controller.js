'use strict';

angular.module('adventureJS')
  .controller('ModeratorCtrl', function ($scope, $http, Auth, User) {
    $scope.roles = Auth.userRoles;

    // Use the User $resource to fetch all users
    $scope.users = User.query();
    
    $scope.demote = function(user) {
      $http.put('/api/moderator/revokeauthor/' + user._id, user).success(function(){
        $scope.users = User.query();
      });
    };

  });
