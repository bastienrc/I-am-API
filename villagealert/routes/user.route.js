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

/**
 * @openapi
 * /api/users/signup:
 *   post:
 *     description: Création d'un compte
 *     tags: [Citoyen]
 *     parameters:
 *       - name: email
 *         description: email
 *         schema:
 *           type: string
 *         required: true
 *       - name: password
 *         description: password
 *         schema:
 *           type: string
 *         required: true
 *       - name: firstname
 *         description: firstname
 *         schema:
 *           type: string
 *         required: true
 *       - name: lastname
 *         description: lastname
 *         schema:
 *           type: string
 *         required: true
 *       - name: address
 *         description: address
 *         schema:
 *           type: string
 *         required: true
 *       - name: phone
 *         description: phone
 *         schema:
 *           type: string
 *         required: true
 *       - name: city
 *         description: city
 *         schema:
 *           type: string
 *         required: true
 *       - name: postCode
 *         description: postCode
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Signup OK
 *       400:
 *         description: ERROR
 */
router.post('/signup', passport.authenticate('signup', { session: false }), catchErrors(signup))

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     description: Connexion a son compte
 *     tags: [Citoyen]
 *     parameters:
 *       - name: email
 *         description: email
 *         schema:
 *           type: string
 *         required: true
 *       - name: password
 *         description: password
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Renvoie un token d'authentification
 *       400:
 *         description: Bad Request, vous n'auriez pas oublié quelque chose ?
 */
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
        res.json({ token })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
}
)

//
// Citoyen connecté
//

/**
 * @openapi
 * /api/users/account:
 *   get:
 *     description: voir son compte
 *     tags: [Citoyen connecté]
 *     responses:
 *       200:
 *         description: envoie les données du citoyen
 *       400:
 *         description: error
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 *
 */
router.get('/account', passport.authenticate('jwt', { session: false }), catchErrors(getAccount))

/**
 * @openapi
 * /api/users/account:
 *   patch:
 *     description: Mettre à jour son profil
 *     tags: [Citoyen connecté]
 *     parameters:
 *       - name: token
 *         description: token
 *         schema:
 *           type: string
 *         required: true
 *       - name: id
 *         description: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Votre compte a été modifié !
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 */
router.patch('/account', passport.authenticate('jwt', { session: false }), updateAccount)

/**
 * @openapi
 * /api/users/account:
 *   delete:
 *     description: Effacer son compte
 *     tags: [Citoyen connecté]
 *     parameters:
 *       - name: token
 *         description: token
 *         schema:
 *           type: string
 *         required: true
 *       - name: id
 *         description: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Votre compte a été supprimé !
 *       400:
 *         description: ...
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 */
router.delete('/account', passport.authenticate('jwt', { session: false }), deleteAccount)

//
// Admin
//

/**
 * @openapi
 * /api/users/:id:
 *   patch:
 *     description: mise à jour du role et service de l'utilisateur
 *     tags: [Users admin]
 *     parameters:
 *       - name: token
 *         description: token
 *         schema:
 *           type: string
 *         required: true
 *       - name: id
 *         description: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: ...
 *       400:
 *         description: ...
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 */
router.patch('/:id', passport.authenticate('jwt', { session: false }), catchErrors(updateUser))

/**
 * @openapi
 * /api/users/list:
 *   get:
 *     description: liste tous les utilisateurs
 *     tags: [Users admin]
 *     parameters:
 *       - name: token
 *         description: token
 *         schema:
 *           type: string
 *         required: true
 *       - name: id
 *         description: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: ...
 *       400:
 *         description: ...
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 */
router.get('/list', passport.authenticate('jwt', { session: false }), catchErrors(getAllUser))

/**
 * @openapi
 * /api/users/:id:
 *   get:
 *     description: Affiche la fiche utilisateur
 *     tags: [Users admin]
 *     parameters:
 *       - name: token
 *         description: token
 *         schema:
 *           type: string
 *         required: true
 *       - name: id
 *         description: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: ...
 *       400:
 *         description: ...
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), catchErrors(getOneUser))

/**
 * @openapi
 * /api/users/:id:
 *   delete:
 *     description: L'admin peut effacer un compte
 *     tags: [Users admin]
 *     parameters:
 *       - name: token
 *         description: token
 *         schema:
 *           type: string
 *         required: true
 *       - name: id
 *         description: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: ...
 *       400:
 *         description: ...
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), catchErrors(deleteUser))

export default router
