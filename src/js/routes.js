'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('PanteonApp').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');
    }
]);