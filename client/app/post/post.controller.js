'use strict';

angular.module('adventureJS')
  .controller('PostCtrl', function ($scope, $http, socket, Auth, $stateParams) {
    $scope.isRole = Auth.isRole;
    $scope.isRoleLeast = Auth.isRoleLeast;
    $scope.isAuthenticated = Auth.isAuthenticated;
    $scope.currentUser = Auth.getCurrentUser();
    $scope.topicId = $stateParams.id;
    $scope.postId = $stateParams.postId;
    //console.log($stateParams.id);
    $scope.isAdmin = Auth.isAdmin;
    
    $scope.topic = {title: "Ehh."};
    $scope.post = {title: "Nothing to see here..."};

    $scope.comments = [];
    
    $http.get('/api/topics/'+$scope.topicId).success(function(topic) {
      $scope.topic = topic;
      socket.syncUpdates('topic', $scope.topic);
      //console.log(posts);
    });
    
    $http.get('/api/posts/'+$scope.postId).success(function(post) {
      $scope.post = post;
      socket.syncUpdates('post', $scope.post);
      //console.log(posts);
    });

    $http.get('/api/posts/'+$scope.postId+'/comments').success(function(comments) {
      $scope.comments = comments;
      socket.syncUpdates('comment', $scope.comments);
      //console.log(posts);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/comments', 
      {
        author: $scope.currentUser._id, 
        post: $scope.postId,
        content: $scope.newThing
      });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/posts/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('post');
    });
  });
