const mongoose = require('mongoose')

const alertSchema = mongoose.Schema({
//   alertId: mongoose.ObjectId,
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
  cp: {
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
    maxLength: [42, 'Maximum 42 caractères']
    // contains: [voirie, stationnement, travaux]
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
    type: String
  },
  video: {
    type: String
  }
},
{
  timestamps: true
})

mongoose.plugin(schema => {
  schema.pre('findOneAndUpdate', setRunValidators)
  schema.pre('updateMany', setRunValidators)
  schema.pre('updateOne', setRunValidators)
  schema.pre('update', setRunValidators)
})

function setRunValidators () {
  this.setOptions({ runValidators: true })
}

module.exports = mongoose.model('Alert', alertSchema)
