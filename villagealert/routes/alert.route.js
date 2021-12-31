import express from 'express'
import {
  readOneAlert, newAlert, deleteAlert,
  readOwnAlerts, readServiceAlerts, updateAlert
} from '../controllers/alert.controller.js'
import uploadImage from '../utils/cloudinary.js'
import passport from 'passport'
import dotenv from 'dotenv'
// import { catchErrors } from '../utils/helpers.js'

dotenv.config()

const router = express.Router()

//
// Citoyen
//

// Create
router.post('/', passport.authenticate('jwt', { session: false }), uploadImage, newAlert)

// Read: Il peut voir son alerte
router.get('/:id', passport.authenticate('jwt', { session: false }), readOneAlert)

// Read: Il peut voir toutes ses alertes
router.get('/list', passport.authenticate('jwt', { session: false }), readOwnAlerts)

// Delete: Il peut supprimer son alerte
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteAlert)

//
// Responsable
//

// Read: Il peut voir la liste des alertes selon son service
router.get('/list', passport.authenticate('jwt', { session: false }), readServiceAlerts)

// Read: Il peut mettre à jour le status des alerts
router.patch('/:id', passport.authenticate('jwt', { session: false }), updateAlert)

export default router
