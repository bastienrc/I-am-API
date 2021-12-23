import express from 'express'
import passport from 'passport'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { catchErrors } from '../utils/helpers.js'
import {
  signup, getAccount, updateAccount, deleteAccount,
  updateUser, deleteUser, getOneUser, getAllUser
} from '../controllers/user.controller.js'
dotenv.config()

const router = express.Router()

//
// Citoyen
//

// Création d'un compte
router.post('/signup', passport.authenticate('signup', { session: false }), catchErrors(signup))

// Connexion a son compte
router.post('/login', (req, res, next) => {
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
        res.json({ id: user._id, token })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
}
)

// Voir son profil
router.get('/account', passport.authenticate('signup', { session: false }), catchErrors(getAccount))

// Mettre à jour son profil
router.patch('/account', passport.authenticate('jwt', { session: false }), catchErrors(updateAccount))

// Effacer son compte
router.delete('/account', passport.authenticate('jwt', { session: false }), catchErrors(deleteAccount))

//
// Admin
//

// Update: mise à jour du role et service de l'utilisateur
router.patch('/:id', passport.authenticate('jwt', { session: false }), catchErrors(updateUser))

// Read All: Liste tous les utilisateurs
router.get('/', passport.authenticate('jwt', { session: false }), catchErrors(getAllUser))

// Read One: Affiche la fiche utilisateur
router.get('/:id', passport.authenticate('jwt', { session: false }), catchErrors(getOneUser))

// Effacer son compte
router.delete('/:id', passport.authenticate('jwt', { session: false }), catchErrors(deleteUser))

export default router
