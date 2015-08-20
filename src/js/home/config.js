'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('PanteonApp.home').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                controller: 'HomeCtrl',
                templateUrl: 'templates/index.html',
                controllerAs: 'vm'
            });
    }
]);