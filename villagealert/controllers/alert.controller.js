import Alert from '../models/alert.model.js'
import sendMail from '../utils/sendMail.js'

export function readOneAlert (req, res, next) {
  Alert.findOne({ _id: req.params.id })
    .then(alert => res.status(200).json(alert))
    .catch(error => res.status(404).json({ error }))
}

export function readAllAlerts (req, res, next) {
  Alert.find()
    .then(alerts => res.status(200).json(alerts))
    .catch(error => res.status(400).json({ error }))
}

function mailAlert (info) {
  const {
    lastName,
    firstName,
    userAdress,
    postCode,
    city,
    email,
    phone,
    description,
    date,
    image,
    video
  } = info

  return `
    <h2>Nouvelle Alerte !!!</h2>
    <p>${firstName} ${lastName}</p>

    <p>${userAdress}</p>
    <p>${postCode} ${city}</p>
    <p>${email}</p>
    <p>${phone}</p>

    <h3>En date du ${date}, nous envoie l'alerte suivante :</h3>
    <p>Description: ${description}</p>

    <h3>Image et video :</h3>
    <image src="${image}" />
    <video src="${video}" />
  `
}

export function newAlert (req, res, next) {
  const alert = new Alert({
    ...req.body
  })
  alert.save()
    .then(() => {
      let emailService
      switch (typeAlert) {
        case 'voirie':
          emailService = 'voirie@simplonville.co'
          break
        case 'stationnement':
          emailService = 'stationnement@simplonville.co'
          break
        case 'travaux':
          emailService = 'travaux@simplonville.co'
          break
        default:
          emailService = 'autres@simplonville.co'
          break
      }
      sendMail(emailService, 'Nouvelle alerte.', mailAlert())
      res.status(201).json({ message: 'Objet enregistré !' })
    })
    .catch(error => res.status(400).json({ error }))
}
