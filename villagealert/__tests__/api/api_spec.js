const frisby = require('frisby')
const baseUrl = 'http://localhost:8000'
const emailTest = 'testAPI002@gmail.com'
const passwordTest = 'mdp123'

//
// USERS
//

// content-type: application/json
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
