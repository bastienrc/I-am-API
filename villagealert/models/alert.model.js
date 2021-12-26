import mongoose from 'mongoose'
const { Schema, model } = mongoose

const alertSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  typeAlert: {
    type: String,
    trim: true,
    required: true,
    enum: ['voirie', 'stationnement', 'travaux', 'autre']
  },
  status: {
    type: String,
    enum: ['todo', 'inProgress', 'done'],
    default: 'todo'
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
