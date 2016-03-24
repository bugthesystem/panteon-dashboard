(function () {
    var panteonApp = angular.module('PanteonApp', [
        'ui.bootstrap',
        'ui.router',
        'ngCookies',
        'PanteonApp.common',
        'PanteonApp.home',
        'toaster',
        'ngAnimate',
        'smart-table'
    ]);

    init()
        .then(function () {
            angular.element(document).ready(function () {
                angular.bootstrap(document.getElementById('PanteonApp'), ['PanteonApp']);
            });
        });

    function init() {
        var initInjector = angular.injector(['ng']);
        var $http = initInjector.get('$http');

        return $http.get("/config.json").then(function (response) {
            panteonApp.constant('Constants', response.data);
        }, function (errorResponse) {
            console.log(errorResponse);
        });
    }
}());