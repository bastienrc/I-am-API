const frisby = require('frisby')
const baseUrl = 'http://localhost:8000'
// const baseUrl = 'https://villagealert.herokuapp.com'
const timestamp = Date.now()
const emailTest = `testAPI${timestamp}@gmail.com`
const passwordTest = 'mdp123'

//
// USERS
//

// Test de création de compte
it('Should be signup', function () {
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

// Test get account
it('Should have this info user', function () {
  return frisby
    .setup({
      request: {
        headers: {
          Authorization: 'Bearer ' + Buffer.from('token').toString('base64')
        }
      }
    })
    .get(baseUrl + '/api/users/account')
    .expect('status', 200)
})

// Test patch account
it('Should update user account', function () {
  return frisby
    .setup({
      request: {
        headers: {
          Authorization: 'Bearer ' + Buffer.from('token').toString('base64')
        }
      }
    })
    .patch(baseUrl + '/api/users/account', {
      firstname: 'Luke',
      lastname: 'Skywalker'
    })
    .expect('status', 200)
})

// Test delete account
it('Should delete user account', function () {
  return frisby
    .setup({
      request: {
        headers: {
          Authorization: 'Bearer ' + Buffer.from('token').toString('base64')
        }
      }
    })
    .delete(baseUrl + '/api/users/account')
    .expect('status', 200)
})
