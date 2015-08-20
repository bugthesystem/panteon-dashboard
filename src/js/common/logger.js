(function() {
  'use strict';

  angular
    .module('PanteonApp.common')
    .factory('logger', logger);

  function logger() {

    var loggr = {
      info: info,
      error: info
    };

    return loggr;

    function info(message) {
      console.log(message)
    }
  }
})();
