'use strict';

angular.module('adventureJS')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {

    $scope.isRole = Auth.isRole;
    $scope.isRoleLeast = Auth.isRoleLeast;
    $scope.isAdmin = Auth.isAdmin;

    $scope.topics = [];
    
    $scope.newTopic = {};

    $http.get('/api/topics').success(function(topics) {
      $scope.topics = topics;
      socket.syncUpdates('topic', $scope.topics);
      //console.log(topics);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/topics', $scope.newTopic);
      $scope.newTopic = {};
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/topics/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('topic');
    });
  });
