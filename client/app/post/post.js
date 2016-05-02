'use strict';

angular.module('adventureJS')
  .config(function ($stateProvider) {
    $stateProvider
      .state('post', {
        url: '/topic/:id/post/:postId',
        templateUrl: 'app/post/post.html',
        controller: 'PostCtrl'
      });
  });