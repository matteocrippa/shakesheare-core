(function() {
  
  var encryptor = require('file-encryptor')

  angular
  .module('index', ['angularFileUpload'])

  function IndexController($log, $scope, $window) {
    var vm = this
    
    vm.setup = true
    vm.encdecoding = false
    vm.finished = false

    $scope.$watch(angular.bind(this, function() {
      return this.files
    }),function(newVal, oldVal){
      $log.log(newVal[0].path)
      
      if(newVal[0].path.length > 1){
        if(!vm.password){
          alert('You must set a password to encode/decode the file.')
          return
        }
      }
      
      vm.setup = false
      vm.encdecoding = true
      
      encryptor.encryptFile(newVal[0].path, newVal[0].path + '.shake', vm.password, {
        algorithm: 'aes256'
      }, function(err) {
        console.log(err)
        if(err){
          alert(err)
        }else{
          vm.encdecoding = false
          vm.finished = true
        }
      })
      
    })
  }

  angular
  .module('index')
  .controller('IndexController', IndexController)

})()
