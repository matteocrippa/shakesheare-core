window.dash = window.dash || {}

var encryptor = require('file-encryptor')

dash.encryptFile = function(file, password) {
  encryptor.encryptFile(file, file + '.shake', password, {
    algorithm: 'aes256'
  }, function(err) {
    console.log(err)
  })
}

dash.decryptFile = function(file, password) {
  var decryptedFile = file.replace('.shake', '')

  encryptor.encryptFile(file, decryptedFile, password, {
    algorithm: 'aes256'
  }, function(err) {
    console.log(err)
  })

}

dash.info = function() {
  return "info"
}