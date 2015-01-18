(function() {

  var encryptor = require('file-encryptor')

  angular
    .module('index', ['angularFileUpload'])

  function IndexController($log, $scope, $window) {
    var vm = this

    vm.setup = true
    vm.encdecoding = false
    vm.action = null
    vm.finished = false

    vm.restart = function() {
      vm.password = null
      vm.setup = true
      vm.encdecoding = vm.finished = false
      vm.action = null
    }

    $scope.$watch(angular.bind(this, function() {
      return this.files
    }), function(newVal, oldVal) {

      $log.log(newVal[0].path)

      if (newVal[0].path.length > 1) {
        if (!vm.password) {
          alert('You must set a password to encode/decode the file.')
          return
        }
      }

      vm.setup = false
      vm.encdecoding = true

      if (newVal[0].path.indexOf('.shake') != -1) {
        vm.action = 'decoding'

        var decryptedFile = newVal[0].path.replace('.shake', '')

        encryptor.decryptFile(newVal[0].path, decryptedFile, vm.password, {
          algorithm: 'aes256'
        }, function(err) {
          if (err) {
            alert(err)
          } else {
            vm.encdecoding = false
            vm.finished = true
          }

          $scope.$apply()
          $scope.$digest()

        })

      } else {
        vm.action = 'encoding'

        encryptor.encryptFile(newVal[0].path, newVal[0].path + '.shake', vm.password, {
          algorithm: 'aes256'
        }, function(err) {
          if (err) {
            alert(err)
          } else {
            $scope.$apply(function(){
              vm.encdecoding = false
              vm.finished = true
            })

            $scope.$apply()
            $scope.$digest()
          }
        })
      }

    })
  }

  angular
    .module('index')
    .controller('IndexController', IndexController)

})()
