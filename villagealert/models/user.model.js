import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Cet email n\'est pas valide !']
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Citoyen', 'Responsable Service', 'Admin'],
    default: 'Citoyen'
  },
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
  }
})

// Pré Hook - Avant d'enregistre dans Mongo
UserSchema.pre('save', async function (next) {
  const user = this
  const hash = await bcrypt.hash(user.password, 10)
  user.password = hash
  next()
})

// Ajouter une méthode pour vérifier le password
UserSchema.methods.isValidPassword = function (password) {
  const user = this
  const isSame = bcrypt.compare(password, user.password)
  return isSame
}

const UserModel = mongoose.model('User', UserSchema)
export default UserModel
