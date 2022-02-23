import express from 'express'
import { authentication, authorization } from '../controllers/auth.controller.js'
import {
  readOneAlert, newAlert, deleteAlert,
  readOwnAlerts, readServiceAlerts, updateAlert
} from '../controllers/alert.controller.js'
import uploadImage from '../utils/cloudinary.js'

const router = express.Router()

/**
 * @openapi
 * /api/alerts/:
 *   post:
 *     description: Création d'une alerte
 *     tags: [Alertes]
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
router.post('', authentication, authorization, uploadImage, newAlert)

/**
 * @openapi
 * /api/alerts/:id:
 *   get:
 *     description: Affiche l'alerte :id
 *     tags: [Alertes]
 *     responses:
 *       200:
 *         description: ...
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 */
router.get(':id', authentication, authorization, readOneAlert)

/**
 * @openapi
 * /api/alerts/:
 *   get:
 *     description: Affiche toutes les alertes de l'utilisateur connecté
 *     tags: [Alertes]
 *     responses:
 *       200:
 *         description: ...
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 */
router.get('', authentication, authorization, readOwnAlerts)

/**
 * @openapi
 * /api/alerts/:id:
 *   delete:
 *     description: Supprime l'alert :id
 *     tags: [Alertes]
 *     responses:
 *       200:
 *         description: ...
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 */
router.delete(':id', authentication, authorization, deleteAlert)

/**
 * @openapi
 * /api/alerts/:service:
 *   get:
 *     description: Affiche la liste des alertes selon le service de l'utilisateur connecté
 *     tags: [Alertes]
 *     responses:
 *       200:
 *         description: ...
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 */
router.get(':service', authentication, authorization, readServiceAlerts)

/**
 * @openapi
 * /api/alerts/:id:
 *   patch:
 *     description: Mise à jour du status de l'alerte :id
 *     tags: [Alertes]
 *     responses:
 *       200:
 *         description: ...
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 */
router.patch(':id', authentication, authorization, updateAlert)

export default router
