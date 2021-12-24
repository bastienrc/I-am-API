const frisby = require('frisby')
const baseUrl = 'http://localhost:8000'
const timestamp = Date.now()
const emailTest = `testAPI${timestamp}@gmail.com`
const passwordTest = 'mdp123'

//
// USERS
//

// Test de création de compte
it('Should signup', function () {
  return frisby.post(baseUrl + '/api/users/signup', {
    email: emailTest,
    password: passwordTest,
    firstname: 'Pat',
    lastname: 'Hibulaire',
    address: '42 rue nullepart ailleurs',
    phone: '0123456789',
    city: 'Calais',
    postCode: '62200'
  })
    .expect('status', 200)
})

// Test de connexion
it('Should be login', function () {
  return frisby.post(baseUrl + '/api/users/login', {
    email: emailTest,
    password: passwordTest
  })
    .expect('status', 200)
})
