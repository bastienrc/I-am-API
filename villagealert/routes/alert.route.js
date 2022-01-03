import express from 'express'
import {
  readOneAlert, newAlert, deleteAlert,
  readOwnAlerts, readServiceAlerts, updateAlert
} from '../controllers/alert.controller.js'
import uploadImage from '../utils/cloudinary.js'
import passport from 'passport'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

//
// Citoyen connecté
//

/**
 * @openapi
 * /api/alerts/:
 *   post:
 *     description: créer la fiche utilisateur
 *     tags: [Citoyen connecté]
 *     parameters:
 *       - name: typeAlert
 *         description: type de l'alerte (voirie, stationnement, travaux, autre)
 *         schema:
 *           type: string
 *         required: true
 *       - name: description
 *         description: description de l'alerte
 *         schema:
 *           type: string
 *         required: true
 *       - name: addressAlert
 *         description: adresse de l'alerte
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       201:
 *         description: ...
 *       400:
 *         description: ...
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 */
router.post('/', passport.authenticate('jwt', { session: false }), uploadImage, newAlert)

/**
 * @openapi
 * /api/alerts/:id:
 *   get:
 *     description: affiche la fiche alerte :id
 *     tags: [Citoyen connecté]
 *     responses:
 *       200:
 *         description: ...
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), readOneAlert)

/**
 * @openapi
 * /api/alerts/:
 *   get:
 *     description: affiche toutes ses alertes
 *     tags: [Citoyen connecté]
 *     responses:
 *       200:
 *         description: ...
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 */
router.get('/', passport.authenticate('jwt', { session: false }), readOwnAlerts)

/**
 * @openapi
 * /api/alerts/id:
 *   delete:
 *     description: supprime une alert :id
 *     tags: [Citoyen connecté]
 *     responses:
 *       200:
 *         description: ...
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteAlert)

//
// Responsable
//

/**
 * @openapi
 * /api/alerts/:list:
 *   get:
 *     description: voie la liste des alertes selon son service
 *     tags: [Responsable]
 *     responses:
 *       200:
 *         description: ...
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 */
router.get('/:list', passport.authenticate('jwt', { session: false }), readServiceAlerts)

/**
 * @openapi
 * /api/alerts/:id:
 *   patch:
 *     description: peut mettre à jour le status de l'alert :id
 *     tags: [Responsable]
 *     responses:
 *       200:
 *         description: ...
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 */
router.patch('/:id', passport.authenticate('jwt', { session: false }), updateAlert)

export default router
