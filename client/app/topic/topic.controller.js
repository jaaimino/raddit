'use strict';

angular.module('adventureJS')
  .controller('TopicCtrl', function ($scope, $http, socket, Auth, $stateParams) {
    $scope.isRole = Auth.isRole;
    $scope.isRoleLeast = Auth.isRoleLeast;
    $scope.currentUser = Auth.getCurrentUser();
    $scope.topicId = $stateParams.id;
    
    $scope.isAdmin = Auth.isAdmin;
    
    $scope.topic = {title: "Nothing to see here..."};

    $scope.posts = [];
    
    $scope.newPost = {};
    
    $http.get('/api/topics/'+$scope.topicId).success(function(topic) {
      $scope.topic = topic;
      socket.syncUpdates('topic', $scope.topic);
    });

    $http.get('/api/topics/'+$scope.topicId+'/posts').success(function(posts) {
      $scope.posts = posts;
      socket.syncUpdates('post', $scope.posts);
    });

    $scope.addThing = function() {
      if($scope.newPost.title === '' || $scope.newPost.content === '') {
        return;
      }
      $scope.newPost.topic = $scope.topicId;
      $http.post('/api/posts', $scope.newPost);
      $scope.newPost = {};
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/posts/' + thing._id);
    };
    
    $scope.cancel = function(){
      $scope.newPost = {};
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('post');
    });
  });
