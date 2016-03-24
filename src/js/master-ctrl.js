(function () {
    /**
     * Master Controller
     */

    angular.module('PanteonApp')
        .controller('MasterCtrl', ['$scope', '$cookieStore', '$window', 'Constants', MasterCtrl])
    ;

    function MasterCtrl($scope, $cookieStore, $window, Constants) {
        /* jshint validthis: true */
        var vm = this;

        /**
         * Sidebar Toggle & Cookie Control
         */

        vm.getWidth = function () {
            return window.innerWidth;
        };

        $scope.$watch(vm.getWidth, function (newValue, oldValue) {
            if (newValue >= Constants.MOBILE_VIEW_WIDTH) {
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