import passport from 'passport'
import UserModel from '../models/user.model.js'
import RoleModel from '../models/role.model.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// Variables d'environnement
dotenv.config()

export async function signup (req, res, next) {
  passport.authenticate('signup', { session: false }, async (fail, error, success) => {
    // if (error) return next(error)
    if (fail) return res.status(fail.status).json({ message: fail.message })
    res.status(201).json({ message: 'Merci de votre inscription' })
  })(req, res, next)
}

export async function authentication (req, res, next) {
  passport.authenticate('jwt', { session: false })(req, res, next)
}

export async function login (req, res, next) {
  passport.authenticate('login', async (err, user) => {
    try {
      if (err || !user) {
        const error = new Error('Une erreur est survenue.')
        return next(error)
      }

      req.login(user, { session: false }, async error => {
        if (error) return next(error)

        const body = { _id: user._id, email: user.email }
        const token = jwt.sign({ user: body }, process.env.SECRET_KEY)
        res.json({ token })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
}

export async function authorization (req, res, next) {
  try {
    // Selon le role de l'utilisateur, on recherche les authorisations dans
    // la collection role.
    // L'utilisateur openData est le role par defaut et il définit les
    // authorisations des visiteurs (non connectés).

    // const path = req.baseUrl + req.route.path
    // const methods = req.route.methods

    // Role par defaut
    let role = 'openData'
    // console.table(typeof req.headers.authorization)
    // console.log('> Le role est : ' + role)

    // Récupération du role de l'utilisateur connecté
    if (typeof req.headers.authorization !== 'undefined') {
      // J'extraie l'id user du token
      const token = req.headers.authorization.split(' ')[1]
      const userId = jwt.verify(token, process.env.SECRET_KEY).user._id
      // console.log('ID:', userId)

      // A partir de l'id j'obtiens son role
      const users = await UserModel.find({ _id: userId })
      role = users[0].role
      // console.log('Role:', role)
    }
    // console.log('>> Le role est : ' + role)

    // Avec 'req', je construis l'adrresse
    let address = req.method + ' ' + req.baseUrl + req.route.path
    address = address.toLowerCase()
    // console.log(req.originalUrl)
    // console.log(address)

    // Role
    const roles = await RoleModel.findOne({ roleName: role })
    // console.log('Roles liste:', roles)

    let isAuth = false
    roles.auths.map(({ url, auth }) => {
      if (url === address) {
        // console.log(url + ':::' + auth)
        isAuth = auth
      }
      return isAuth
    })

    // console.log(isAuth)

    if (isAuth) {
      res.locals.roleName = role
      res.locals.address = address
      next()
    } else {
      res.status(401).json({ message: 'Accès Non Autorisé !' })
    }
  } catch (error) {
    res.send(error)
  }
}
