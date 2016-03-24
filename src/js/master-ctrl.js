(function () {
    /**
     * Master Controller
     */

    angular.module('PanteonApp')
        .controller('MasterCtrl', ['$scope', '$cookieStore', '$window', MasterCtrl])
    ;

    function MasterCtrl($scope, $cookieStore, $window) {
        /* jshint validthis: true */
        var vm = this;

        /**
         * Sidebar Toggle & Cookie Control
         */
        var mobileView = 992;

        vm.getWidth = function () {
            return window.innerWidth;
        };

        $scope.$watch(vm.getWidth, function (newValue, oldValue) {
            if (newValue >= mobileView) {
                if (angular.isDefined($cookieStore.get('toggle'))) {
                    vm.toggle = $cookieStore.get('toggle');
                } else {
                    vm.toggle = true;
                }
            } else {
                vm.toggle = false;
            }

        });

        vm.toggleSidebar = function () {
            vm.toggle = !vm.toggle;
            $cookieStore.put('toggle', vm.toggle);
        };

        $window.onresize = function () {
            $scope.$apply();
        };
    }
})();