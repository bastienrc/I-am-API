const Alert = require('../models/alert.model')

exports.readOneAlert = (req, res, next) => {
  Alert.findOne({ _id: req.params.id })
    .then(alert => res.status(200).json(alert))
    .catch(error => res.status(404).json({ error }))
}

exports.readAllAlerts = (req, res, next) => {
  Alert.find()
    .then(alerts => res.status(200).json(alerts))
    .catch(error => res.status(400).json({ error }))
}

exports.newAlert = (req, res, next) => {
  const alert = new Alert({
    ...req.body
  })
  alert.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }))
}
