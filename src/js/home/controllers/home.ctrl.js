/**
 * Home Controller
 */

angular.module('PanteonApp.home')
    .controller('HomeCtrl',
        ['$scope', 'tasksService', 'logger', '$pusher', '$timeout', 'toaster', '$modal', 'Constants','_', HomeCtrl]
    );

function HomeCtrl($scope, tasksService, logger, $pusher, $timeout, toaster, $modal, Constants,_) {
    
    /* jshint validthis: true */
    var vm = this;

    vm._puherChannel = null;
    vm.tasks = [];
    vm.searchTerm = "";

    vm.loadTasks = loadTasks;
    vm.stopTask = stopTask;
    vm.startTask = startTask;
    vm.taskHistory = taskHistory;

    init();

    function init() {

        watchTasks();

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

    function stopTask(task) {
        console.log("stopTask called");
        return tasksService.stopTaskByName(task.Name).then(function (result) {
            task.IsScheduleRunning = false;
            console.log(result);
        });
    }

    function taskHistory(task) {
        console.log("startTask called");
        return tasksService.getHistoryByTaskName(task.Name).then(function (result) {

            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'templates/historyModal.html',
                controller: 'HistoryModalCtrl',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    viewModel: function () {
                        return {name: task.Name, history: result};
                    }
                }
            });
        });
    }

    function startTask(task) {
        console.log("startTask called");
        return tasksService.startTaskByName(task.Name).then(function (result) {
            task.IsScheduleRunning = true;
            console.log(result);
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
                    toaster.pop('info', found[0].Name, "Completed");
                });
            }
        }
    }

    function taskStarted(data) {
        console.log(JSON.stringify(data));

        var found = _.chain(vm.tasks).filter(function (taskItem) {
            return taskItem.Name === data.TaskName;
        }).value();
        if (found && found.length > 0) {
            found[0].IsScheduleRunning = true;
            toaster.pop('info', found[0].Name, " Started");
        }
    }

    function taskPaused(data) {
        console.log(JSON.stringify(data));

        var found = _.chain(vm.tasks).filter(function (taskItem) {
            return taskItem.Name === data.TaskName;
        }).value();
        if (found && found.length > 0) {
            /*TODO: Pause*/
            found[0].IsScheduleRunning = false;
            toaster.pop('info', found[0].Name, " Paused");
        }
    }

    function taskStopped(data) {
        console.log(JSON.stringify(data));

        var found = _.chain(vm.tasks).filter(function (taskItem) {
            return taskItem.Name === data.TaskName;
        }).value();
        if (found && found.length > 0) {
            found[0].IsScheduleRunning = false;
            toaster.pop('info', found[0].Name, " Stopped");
        }
    }

    function taskActionEnter(data) {
        console.log(JSON.stringify(data));

        var found = _.chain(vm.tasks).filter(function (taskItem) {
            return taskItem.Name === data.TaskName;
        }).value();
        if (found && found.length > 0) {
            found[0].IsRunning = true;
        }
    }

    function taskActionExit(data) {
        console.log(JSON.stringify(data));

        var found = _.chain(vm.tasks).filter(function (taskItem) {
            return taskItem.Name === data.TaskName;
        }).value();
        if (found && found.length > 0) {
            found[0].IsRunning = false;
        }
    }

    function watchTasks() {
        var client = new Pusher(Constants.PUSHER_KEY);
        var pusher = $pusher(client);
        vm._puherChannel = pusher.subscribe('panteon');
        /*TODO: rename task to worker*/
        pusher.bind('task:onprogress', taskProgress);
        pusher.bind('task:onstarted', taskStarted);
        pusher.bind('task:onstopped', taskStopped);
        pusher.bind('task:onpaused', taskPaused);

        pusher.bind('task:onenter', taskActionEnter);
        pusher.bind('task:onexit', taskActionExit);

        //pusher.bind('task:onexception', taskException);
    }
}