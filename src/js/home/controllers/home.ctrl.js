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
    vm.searchTerm = "";

    vm.loadTasks = loadTasks;
    vm.stopTask = stopTask;
    vm.startTask = startTask;

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
        var client = new Pusher('629772c3ccd3b206462f');
        var pusher = $pusher(client);
        var my_channel = pusher.subscribe('panteon');
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