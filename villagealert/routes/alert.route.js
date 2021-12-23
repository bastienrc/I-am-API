import express from 'express'
import { readAllAlerts, readOneAlert, newAlert, deleteAlert } from '../controllers/alert.controller.js'
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
router.get('/:id', passport.authenticate('jwt', { session: false }), readOneAlert)

// Delete: Il peut supprimer son alerte
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteAlert)

//
// Responsable
//

// Il peut voir la liste des alertes selon son service
// Read
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  readOneAlert
)


// Il peut mettre à jour le status des alerts

//
// Admin
//

// Read All
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  readAllAlerts
)

export default router
