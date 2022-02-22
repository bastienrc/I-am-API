const dotenv = require('dotenv')
const frisby = require('frisby')
const Joi = frisby.Joi

// Variables d'environnement
dotenv.config()
const baseUrl = 'http://localhost:' + process.env.PORT || 3500

let authToken

describe('Test Citoyen', () => {
  //
  // Connexion
  //
  describe('Connexion', () => {
    // Test de création de compte
    it('Should be signup', function () {
      return frisby.post(baseUrl + '/api/users/signup', {
        email: 'user01@gmail.com',
        password: 'Test62200',
        firstname: 'Pat',
        lastname: 'Hibulaire',
        address: '42 rue nullepart ailleurs',
        phone: '0123456789',
        city: 'Calais',
        postCode: '62200'
      })
        .expect('status', 200)
    })

    it('It should be login', function () {
      return frisby.post(baseUrl + '/api/users/login', {
        email: 'admin@gmail.com',
        password: 'Admin000'
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

    it('It should have an error if password is wrong', function () {
      return frisby.post(baseUrl + '/api/users/login', {
        email: 'admin@gmail.com',
        password: 'Mauvais mot de passe'
      })
        .expect('status', 400)
        .expect('json', { message: 'Identifiants incorrect' })
    })
  })

  //
  // Profil
  //
  describe('Account', () => {
    // Read
    it('It should have this info', function () {
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

    // Update
    it('It should update this info', function () {
      return frisby
        .setup({
          request: {
            headers: {
              Authorization: 'Bearer ' + authToken
            }
          }
        })
        .patch(baseUrl + '/api/users/account', {
          firstname: 'Anakin',
          lastname: 'Skywalker'
        })
        .expect('status', 200)
        .expect('json', { message: 'Votre compte a été modifié !' })
    })

    // Delete
    it('It should can delete this account', function () {
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
  })

  //
  // Alerte
  //
  describe('Alerte', () => {
    it('It should post my Alert', function () {
      return frisby
        .setup({
          request: {
            headers: {
              Authorization: 'Bearer ' + authToken
            }
          }
        })
        .post(baseUrl + '/api/alerts/', {
          typeAlert: 'voirie',
          description: 'Mon voisin est un con finis !',
          addressAlert: 'Mars'
        })
        .expect('status', 201)
        .expect('json', { message: 'Votre alerte a bien été enregistrée!' })
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
        .get(baseUrl + '/api/alerts/')
        .expect('status', 200)
    })

    // Test get alert id
    const idAlert = '61d2bd0602ff2b76a35750e9'
    it('Should get Alert id', function () {
      return frisby
        .setup({
          request: {
            headers: {
              Authorization: 'Bearer ' + authToken
            }
          }
        })
        .get(baseUrl + '/api/alerts/' + idAlert)
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
  })
})
