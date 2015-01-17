(function() {

  angular
  .module('index', ['angularFileUpload'])

  function IndexController($log, $scope, $window) {
    var vm = this

    $scope.$watch(angular.bind(this, function() {
      return this.files
    }),function(newVal, oldVal){
      $log.log(newVal[0].path)
    })
  }

  angular
  .module('index')
  .controller('IndexController', IndexController)

})()
