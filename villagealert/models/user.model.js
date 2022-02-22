import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const { Schema, model } = mongoose

const UserSchema = Schema({
  email: {
    type: String,
    required: [true, 'L\'email est obligatoire'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Cet email n\'est pas valide !']
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'le mot de passe est obligatoire']
    // match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/, 'Ce mot de passe n\'est pas valide !']
  },
  role: {
    type: String,
    default: 'aucun'
  },
  firstname: {
    type: String,
    trim: true,
    minLength: [2, 'Le prénom doit avoir un minimum de 2 caractères'],
    maxLength: [42, 'Le prénom doit avoir un maximum de 42 caractères']
  },
  lastname: {
    type: String,
    trim: true,
    minLength: [2, 'Le nom doit avoir un minimum de 2 caractères'],
    maxLength: [42, 'Le nom doit avoir un maximum de 42 caractères']
  },
  address: {
    type: String,
    trim: true,
    minLength: [2, 'L\'adresse doit avoir un minimum de 2 caractères'],
    maxLength: [42, 'L\'adresse doit avoir un maximum de 42 caractères']
  },
  postCode: {
    type: String,
    trim: true,
    minLength: [5, 'Le code postal doit être de 5 caractères'],
    maxLength: [5, 'Le code postal doit être de 5 caractères']
  },
  city: {
    type: String,
    trim: true,
    minLength: [2, 'Le nom de la ville doit avoir un minimum de 2 caractères'],
    maxLength: [42, 'Le nom de la ville doit avoir un maximum de 42 caractères']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/gm, 'Ce numéro de téléphone n\'est pas valide !']
  },
  avatarUrl: {
    type: String
  }
},
{
  timestamps: true
})

// Hook de pré-sauvegarde, il s'exécute avant chaque enregistrement de document.
// Utiliser pour déterminer si le document actuel est nouveau (pas un appel de mise à jour).
// Si le document est nouveau, hachez le mot de passe.
UserSchema.pre('save', async function (next) {
  if (this.isNew) {
    const user = this
    user.password = await bcrypt.hash(user.password, 10)
  }
  next()
})

// Ajouter une méthode pour vérifier le password
UserSchema.methods.isValidPassword = function (password) {
  const user = this
  const isSame = bcrypt.compare(password, user.password)
  return isSame
}

// Méthode statique qui vérifie si l'utilisateur existe.
// Interrogation de la base de données par par email.
// Si un utilisateur est trouvé, retourne un objet spécifiant lequel est déjà utilisé.
// Sinon, retourne false.
UserSchema.static('emailExists', async function ({ email }) {
  const user = await this.findOne({ email })
  return user ? { email: 'Cet email existe déjà !' } : false
})

// Méthode statique ajoutée au schéma.
// Nous l'utilisons pour authentifier l'utilisateur.
// Si l'utilisateur existe et que la comparaison de mot de passe
// entre plainTextPassword et le mot de passe utilisateur haché est réussie,
// renvoyez l'objet utilisateur.
// Sinon, retourne false pour échec d'authentification.
UserSchema.static('authenticate', async function (username, plainTextPassword) {
  const user = await this.findOne({ $or: [{ email: username }, { username }] })
  if (user && await bcrypt.compare(plainTextPassword, user.password)) return user
  return false
})

export default model('User', UserSchema)
