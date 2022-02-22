import mongoose from 'mongoose'
const { Schema, model } = mongoose

const listRoutes = [
  // auth.controller.js
  'post /api/users/signup',
  'post /api/users/login',
  // user.controller.js
  'get /api/users',
  'get /api/users/:id',
  'patch /api/users/:id',
  'delete /api/users/:id',
  'get /api/users/account',
  'patch /api/users/account',
  'delete /api/users/account',
  // role.controller.js
  'get /api/roles',
  'get /api/roles/:id',
  'post /api/roles',
  'patch /api/roles/:id',
  'delete /api/roles/:id',
  // person.controller.js
  'get /api/persons',
  'get /api/persons/:id',
  'post /api/persons',
  'patch /api/persons/:id',
  'delete /api/persons/:id',
  // commerce.controller.js
  'get /api/commerces',
  'get /api/commerces/:id',
  'post /api/commerces',
  'patch /api/commerces/:id',
  'delete /api/commerces/:id'
]

const listChamps = [
  // commerces.controller.js
  'name',
  'storeHours',
  'address',
  'contact',
  'typology',
  'pmr',
  'creationDate',
  'compagnyName',
  'legalStatus',
  'siret',
  'siren',
  'manager',
  'owner',
  'annualTurnover',
  'franchise',
  'employedNumber',
  'localSize',
  'comment'
]

const RoleSchema = Schema({
  roleName: {
    type: String,
    required: [true, 'Un nom de Role est nécessaire'],
    unique: true,
    lowercase: true,
    trim: true
  },
  auths: [
    {
      url: {
        type: String,
        enum: listRoutes,
        required: [true, 'Une URL est nécessaire'],
        unique: true,
        lowercase: true,
        trim: true
      },
      auth: {
        type: Boolean,
        default: false
      },
      champs: [
        {
          url: {
            type: String,
            enum: listChamps,
            unique: true,
            lowercase: true,
            trim: true
          },
          auth: {
            type: Boolean
          },
          _id: false
        }
      ],
      _id: false
    }
  ]
})

export default model('Role', RoleSchema)
