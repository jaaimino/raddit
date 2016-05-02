'use strict';

angular.module('adventureJS')
  .config(function ($stateProvider) {
    $stateProvider
      .state('topic', {
        url: '/topic/:id',
        templateUrl: 'app/topic/topic.html',
        controller: 'TopicCtrl'
      });
  });