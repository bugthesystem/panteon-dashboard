/**
 * History Modal Controller
 */

angular.module('PanteonApp.home')
    .controller('HistoryModalCtrl',
        ['$scope', 'logger', '$modalInstance', 'viewModel', HistoryModalCtrl]
    );

function HistoryModalCtrl($scope, logger, $modalInstance, viewModel) {
    /* jshint validthis: true */
    var vm = this;

    vm.model = viewModel;
    vm.model.itemsByPage=15;
    vm.model.displayedPages=7;

    vm.close = function () {
        $modalInstance.close();
    };
}