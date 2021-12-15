import mongoose from 'mongoose'
const { Schema, plugin, model } = mongoose

const alertSchema = Schema({
  firstname: {
    type: String,
    trim: true,
    minLength: [2, 'Minimum 2 caractères'],
    maxLength: [42, 'Maximum 42 caractères']
  },
  lastname: {
    type: String,
    trim: true,
    minLength: [2, 'Minimum 2 caractères'],
    maxLength: [42, 'Maximum 42 caractères']
  },
  address: {
    type: String
  },
  postCode: {
    type: String
  },
  city: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email non valide !']
  },
  typeAlert: {
    type: String,
    trim: true,
    required: true,
    minLength: [2, 'Minimum 2 caractères'],
    maxLength: [42, 'Maximum 42 caractères'],
    enum: ['voirie', 'stationnement', 'travaux', 'autre']
  },
  description: {
    type: String,
    trim: true,
    required: true,
    minLength: [0, 'Minimum 2 caractères'],
    maxLength: [500, 'Maximum 500 caractères']
  },
  dateBegin: {
    type: String
  },
  dateEnd: {
    type: String
  },
  addressAlert: {
    type: String
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

plugin(schema => {
  schema.pre('findOneAndUpdate', setRunValidators)
  schema.pre('updateMany', setRunValidators)
  schema.pre('updateOne', setRunValidators)
  schema.pre('update', setRunValidators)
})

function setRunValidators () {
  this.setOptions({ runValidators: true })
}

export default model('Alert', alertSchema)
