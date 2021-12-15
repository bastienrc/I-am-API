const express = require('express')
const { readAllAlerts, newAlert } = require('../controllers/alert.controller')
const router = express.Router()

router.get('/', readAllAlerts)
router.post('/', newAlert)

module.exports = router
