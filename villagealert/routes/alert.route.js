import express from 'express'
import { readAllAlerts, readOneAlert, newAlert, deleteAlert } from '../controllers/alert.controller.js'
import uploadImage from '../utils/cloudinary.js'
import passport from 'passport'
import dotenv from 'dotenv'
// import { catchErrors } from '../utils/helpers.js'

dotenv.config()

const router = express.Router()

// Read All
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  readAllAlerts
)

// Read
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  readOneAlert
)

// Create
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  uploadImage,
  newAlert
)

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  deleteAlert
)

export default router
