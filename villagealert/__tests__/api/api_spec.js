const frisby = require('frisby')
const Joi = frisby.Joi
const baseUrl = 'http://localhost:8000'
// const baseUrl = 'https://villagealert.herokuapp.com'
const timestamp = Date.now()
const emailTest = `testAPI${timestamp}@gmail.com`
const passwordTest = 'mdp123'
let authToken

//
// Citoyen
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
    .expect('jsonTypes', {
      token: Joi.string().required()
    })
    .then(function (res) {
      const data = JSON.parse(res.body)
      authToken = Buffer.from(data.token)
    })
})

//
// Citoyen connecté
//

// Test get account
it('Should have this info user', function () {
  return frisby
    .setup({
      request: {
        headers: {
          Authorization: 'Bearer ' + authToken
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
          Authorization: 'Bearer ' + authToken
        }
      }
    })
    .patch(baseUrl + '/api/users/account', {
      firstname: 'Luke',
      lastname: 'Skywalker'
    })
    .expect('status', 200)
    .expect('json', { message: 'Votre compte a été modifié !' })
})

// Test delete account
it('Should delete user account', function () {
  return frisby
    .setup({
      request: {
        headers: {
          Authorization: 'Bearer ' + authToken
        }
      }
    })
    .delete(baseUrl + '/api/users/account')
    .expect('status', 200)
    .expect('json', { message: 'Votre compte a été supprimé !' })
})

// Test post alert
it('Should post my Alert', function () {
  return frisby
    .setup({
      request: {
        headers: {
          Authorization: 'Bearer ' + authToken
        }
      }
    })
    .delete(baseUrl + '/api/alerts/')
    .expect('status', 200)
})

// Test get alert
it('Should get list Alert', function () {
  return frisby
    .setup({
      request: {
        headers: {
          Authorization: 'Bearer ' + authToken
        }
      }
    })
    .delete(baseUrl + '/api/alerts/list')
    .expect('status', 200)
})

// Test get alert id
const idAlert = 0
it('Should get Alert id', function () {
  return frisby
    .setup({
      request: {
        headers: {
          Authorization: 'Bearer ' + authToken
        }
      }
    })
    .delete(baseUrl + '/api/alerts/' + idAlert)
    .expect('status', 200)
})

// Test delete alert id
it('Should delete Alert id', function () {
  return frisby
    .setup({
      request: {
        headers: {
          Authorization: 'Bearer ' + authToken
        }
      }
    })
    .delete(baseUrl + '/api/alerts/' + idAlert)
    .expect('status', 200)
})

//
// Responsable
//

// Test patch alert id by responsable only
it('Should get Alert id', function () {
  return frisby
    .setup({
      request: {
        headers: {
          Authorization: 'Bearer ' + authToken
        }
      }
    })
    .delete(baseUrl + '/api/alerts/' + idAlert)
    .expect('status', 200)
})
