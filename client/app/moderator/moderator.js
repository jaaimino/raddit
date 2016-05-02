'use strict';

angular.module('adventureJS')
  .config(function ($stateProvider) {
    $stateProvider
      .state('moderator', {
        url: '/moderator',
        templateUrl: 'app/moderator/moderator.html',
        controller: 'ModeratorCtrl'
      });
  });