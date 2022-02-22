import express from 'express'
// import passport from 'passport'
import dotenv from 'dotenv'

import {
  signup,
  login,
  authentication,
  authorization
} from '../controllers/auth.controller.js'

import {
  getAccount, updateAccount, deleteAccount,
  updateUser, deleteUser, getOneUser, getAllUsers
} from '../controllers/user.controller.js'

dotenv.config()

const router = express.Router()

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
router.post('/signup', authentication, authorization, signup)

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
router.post('/login', login)

/**
 * @openapi
 * /api/users/account:
 *   get:
 *     description: voir son compte
 *     tags: [Account]
 *     responses:
 *       200:
 *         description: envoie les données du citoyen
 *       400:
 *         description: error
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 *
 */

router.get('/account', authentication, authorization, getAccount)

/**
 * @openapi
 * /api/users/account:
 *   patch:
 *     description: Mettre à jour son profil
 *     tags: [Account]
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
router.patch('/account', authentication, authorization, updateAccount)

/**
 * @openapi
 * /api/users/account:
 *   delete:
 *     description: Effacer son compte
 *     tags: [Account]
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
router.delete('/account', authentication, authorization, deleteAccount)

/**
 * @openapi
 * /api/users/:id:
 *   patch:
 *     description: mise à jour du role et service de l'utilisateur
 *     tags: [Admin]
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
router.patch('/:id', authentication, authorization, updateUser)

/**
 * @openapi
 * /api/users:
 *   get:
 *     description: liste tous les utilisateurs
 *     tags: [Admin]
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
router.get('', authentication, authorization, getAllUsers)

/**
 * @openapi
 * /api/users/:id:
 *   get:
 *     description: Affiche la fiche utilisateur
 *     tags: [Admin]
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
router.get('/:id', authentication, authorization, getOneUser)

/**
 * @openapi
 * /api/users/:id:
 *   delete:
 *     description: L'admin peut effacer un compte
 *     tags: [Admin]
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
router.delete('/:id', authentication, authorization, deleteUser)

export default router
