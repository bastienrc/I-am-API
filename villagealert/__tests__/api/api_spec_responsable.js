const dotenv = require('dotenv')
const frisby = require('frisby')
const Joi = frisby.Joi

// Variables d'environnement
dotenv.config()
const baseUrl = 'http://localhost:' + process.env.PORT || 3500

let authToken

describe('Test Admin', () => {
  //
  // Connexion
  //
  describe('Connexion', () => {
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
  // Gestion des utilisateurs
  //
  describe('User', () => {
    // Create
    it('It should can signup a user !', function () {
      return frisby
        .post(baseUrl + '/api/users/signup', {
          email: 'newAdmin@gmail.com',
          password: 'Admin000'
        })
        .expect('status', 201)
        .expect('json', { message: 'Signup OK' })
    })

    // Read All
    it('Should have the infos list users', function () {
      return frisby
        .setup({
          request: {
            headers: {
              Authorization: 'Bearer ' + authToken
            }
          }
        })
        .get(baseUrl + '/api/users/')
        .expect('status', 200)
    })

    // Read
    const userId = '6123485817a234f7e06a4a8f'
    it('Should have the info userTest', function () {
      return frisby
        .setup({
          request: {
            headers: {
              Authorization: 'Bearer ' + authToken
            }
          }
        })
        .get(baseUrl + '/api/users/' + userId)
        .expect('status', 200)
    })

    // Update
    it('Should update userTest', function () {
      return frisby
        .setup({
          request: {
            headers: {
              Authorization: 'Bearer ' + authToken
            }
          }
        })
        .patch(baseUrl + '/api/users/' + userId, {
          firstname: 'Luke',
          lastname: 'Skywalker'
        })
        .expect('status', 200)
        .expect('json', { message: 'Le compte a été modifié !' })
    })

    // Delete
    it('Should delete userTest', function () {
      return frisby
        .setup({
          request: {
            headers: {
              Authorization: 'Bearer ' + authToken
            }
          }
        })
        .delete(baseUrl + '/api/users/' + userId)
        .expect('status', 200)
        .expect('json', { message: 'Le compte a été supprimé !' })
    })
  })

  //
  // Role
  //
  describe('Role', () => {
  // Create: Ajout d'un role
    it('Should create a new role', function () {
      return frisby
        .setup({
          request: {
            headers: {
              Authorization: 'Bearer ' + authToken
            }
          }
        })
        .post(baseUrl + '/api/roles', {
          roleName: 'test'
        })
        .expect('status', 201)
    })

    // ReadAll
    it('Should view list role', function () {
      return frisby
        .setup({
          request: {
            headers: {
              Authorization: 'Bearer ' + authToken
            }
          }
        })
        .get(baseUrl + '/api/roles')
        .expect('status', 200)
    })

    // ReadOne
    const roleId = '1110485817a09ff7e06a4a8f'
    it('Should view role', function () {
      return frisby
        .setup({
          request: {
            headers: {
              Authorization: 'Bearer ' + authToken
            }
          }
        })
        .get(baseUrl + '/api/roles/' + roleId)
        .expect('status', 200)
    })

    // Update
    it('Should update role', function () {
      return frisby
        .setup({
          request: {
            headers: {
              Authorization: 'Bearer ' + authToken
            }
          }
        })
        .patch(baseUrl + '/api/roles/' + roleId, {
          auths: [
            { url: 'get /api/users/account', auth: true },
            { url: 'patch /api/users/account', auth: true },
            { url: 'delete /api/users/account', auth: false }
          ]
        })
        .expect('status', 200)
        .expect('json', { message: 'Le role a été modifié !' })
    })

    // Delete
    it('Should delete role', function () {
      return frisby
        .setup({
          request: {
            headers: {
              Authorization: 'Bearer ' + authToken
            }
          }
        })
        .delete(baseUrl + '/api/roles/' + roleId)
        .expect('status', 200)
        .expect('json', { message: 'Le role a été supprimé !' })
    })
  })
})
