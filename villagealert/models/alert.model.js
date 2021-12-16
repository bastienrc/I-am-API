import mongoose from 'mongoose'
const { Schema, model } = mongoose

const alertSchema = Schema({
  firstname: {
    type: String,
    trim: true,
    required: true,
    minLength: [2, 'Le prénom doit avoir un minimum de 2 caractères'],
    maxLength: [42, 'Le prénom doit avoir un maximum de 42 caractères']
  },
  lastname: {
    type: String,
    trim: true,
    required: true,
    minLength: [2, 'Le nom doit avoir un minimum de 2 caractères'],
    maxLength: [42, 'Le nom doit avoir un maximum de 42 caractères']
  },
  address: {
    type: String,
    trim: true,
    required: true,
    minLength: [2, 'L\'adresse doit avoir un minimum de 2 caractères'],
    maxLength: [42, 'L\'adresse doit avoir un maximum de 42 caractères']
  },
  postCode: {
    type: String,
    trim: true,
    required: true,
    minLength: [5, 'Le code postal doit être de 6 caractères'],
    maxLength: [5, 'Le code postal doit être de 6 caractères']
  },
  city: {
    type: String,
    trim: true,
    required: true,
    minLength: [2, 'Le nom de la ville doit avoir un minimum de 2 caractères'],
    maxLength: [42, 'Le nom de la ville doit avoir un maximum de 42 caractères']
  },
  phone: {
    type: String,
    trim: true,
    required: true,
    match: [/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/gm, 'Ce numéro de téléphone n\'est pas valide !']
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Cet email n\'est pas valide !']
  },
  typeAlert: {
    type: String,
    trim: true,
    required: true,
    enum: ['voirie', 'stationnement', 'travaux', 'autre']
  },
  description: {
    type: String,
    trim: true,
    required: true,
    minLength: [0, 'La description doit au faire un Minimum 2 caractères'],
    maxLength: [500, 'Maximum 500 caractères']
  },
  dateBegin: {
    type: Date,
    default: Date.now()
  },
  dateEnd: {
    type: Date,
    default: Date.now()
  },
  addressAlert: {
    type: String,
    trim: true,
    required: true,
    minLength: [2, 'L\'adresse doit avoir un minimum de 2 caractères'],
    maxLength: [42, 'L\'adresse doit avoir un maximum de 42 caractères']
  },
  gps: {
    type: String
  },
  photo: {
    default: '',
    type: String
  },
  video: {
    default: '',
    type: String
  }
},
{
  timestamps: true
})

export default model('Alert', alertSchema)
