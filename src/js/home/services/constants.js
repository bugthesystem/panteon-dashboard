/* global toastr:false, moment:false */
(function () {
    'use strict';

    angular
        .module('PanteonApp.home')
        .constant('Constants', {
            API_URL: 'http://localhost:8080/tasks/',
            PUSHER_KEY:'629772c3ccd3b206462f'
        })
        .constant('_', window._ || {})
    ;
})();