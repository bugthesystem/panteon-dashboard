/**
 * Home Controller
 */

angular.module('PanteonApp.home')
    .controller('HomeCtrl',
    ['$scope', 'tasksService', 'logger', '$pusher', '$timeout', 'toaster',
        HomeCtrl]
);

function HomeCtrl($scope, tasksService, logger, $pusher, $timeout, toaster) {
    /* jshint validthis: true */
    var vm = this;

    vm.tasks = [];


    vm.loadTasks = loadTasks;

    init();

    function init() {

        initRealtime();

        logger.info('START tasks View');

        return loadTasks().then(function () {
            logger.info('init tasks View');
        });
    }

    function loadTasks() {

        return tasksService.getAll().then(function (response) {
            vm.tasks = response;

            return vm.tasks;
        });
    }

    function taskProgress(data) {

        console.log(JSON.stringify(data));

        var found = _.chain(vm.tasks).filter(function (taskItem) {
            return taskItem.Name === data.TaskName;
        }).value();
        if (found && found.length > 0) {
            found[0].Progress = data.Percent;

            if (parseInt(found[0].Progress) >= 90) {
                $timeout(function () {
                    found[0].Progress = 0;
                    toaster.pop('success', found[0].Name, "Completed");
                });
            }
        }
    }

    function initRealtime() {
        var client = new Pusher('629772c3ccd3b206462f');
        var pusher = $pusher(client);
        var my_channel = pusher.subscribe('panteon');
        pusher.bind('task:onprogress', taskProgress);
    }
}