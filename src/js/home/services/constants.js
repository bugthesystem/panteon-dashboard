/* global toastr:false, moment:false */
(function () {
    'use strict';

    angular
        .module('PanteonApp.home')
        .constant('Constants', {
            API_URL: 'http://localhost:8080/tasks/'
        })
        .constant('_', window._ || {})
    ;
})();