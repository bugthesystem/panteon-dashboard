'use strict';

angular
    .module('PanteonApp.home')
    .factory('tasksService', ['$http', '$q', 'logger', 'Constants', tasksService])

;

function tasksService($http, $q, logger, Constants) {

    var service = {
        getAll: getAll,
        getTaskByName: getTaskByName,
        stopTaskByName: stopTaskByName
    };

    return service;

    function getAll() {
        var deferred = $q.defer();

        $http.get(Constants.API_URL)
            .success(function (data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status) {
                logger.error('XHR Failed for tasksService::getAll.' + data);
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function getTaskByName(name) {
        var deferred = $q.defer();

        $http.get(Constants.API_URL + name)
            .success(function (data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status) {
                logger.error('XHR Failed for tasksService::getTaskByName.' + data);
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function stopTaskByName(name) {
        var deferred = $q.defer();

        $http.get(Constants.API_URL + 'stop/' + encodeURIComponent(name))
            .success(function (data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status) {
                logger.error('XHR Failed for tasksService::stopTaskByName.' + data);
                deferred.reject(data);
            });

        return deferred.promise;
    }
}