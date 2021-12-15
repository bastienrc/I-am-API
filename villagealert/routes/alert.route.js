import { Router } from 'express'
import { readAllAlerts, newAlert } from '../controllers/alert.controller.js'
import uploadImage from '../utils/cloudinary.js'

const router = Router()

router.get('/', readAllAlerts)
router.post('/', uploadImage, newAlert)

export default router
