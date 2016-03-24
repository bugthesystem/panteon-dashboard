(function () {
    'use strict';

    /**
     * Route configuration for the RDash module.
     */
    angular.module('PanteonApp').config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            
            $urlRouterProvider.otherwise('/');
        }
    ]);
})();