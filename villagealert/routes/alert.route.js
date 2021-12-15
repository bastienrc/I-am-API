import { Router } from 'express'
import { readAllAlerts, newAlert } from '../controllers/alert.controller.js'
const router = Router()

router.get('/', readAllAlerts)
router.post('/', newAlert)

export default router
