import Alert from '../models/alert.model.js'
// import UserModel from '../models/user.model.js'
import sendMail from '../utils/sendMail.js'
import dotenv from 'dotenv'
import { userIdfromToken } from './user.controller.js'

// Variables d'environnement
dotenv.config()

export function readOneAlert (req, res, next) {
  Alert.findOne({ _id: req.params.id })
    .then(alert => res.status(200).json(alert))
    .catch(error => res.status(404).json({ error }))
}

export function readOwnAlerts (req, res, next) {
  const { _id } = userIdfromToken(req)
  Alert.find({ userId: _id })
    .then(alerts => res.status(200).json(alerts))
    .catch(error => res.status(400).json({ error }))
}

export function readServiceAlerts (req, res, next) {
  Alert.find()
    .then(alerts => res.status(200).json(alerts))
    .catch(error => res.status(400).json({ error }))
}

export function updateAlert (req, res, next) {
  Alert.find()
    .then(alerts => res.status(200).json(alerts))
    .catch(error => res.status(400).json({ error }))
}

function mailAlert (info) {
  const {
    firstname,
    lastname,
    address,
    postCode,
    city,
    phone,
    email,
    // userId,
    description,
    dateBegin,
    dateEnd,
    addressAlert,
    photo
  } = info

  // async function userInfo (userId) {
  //   const data = await UserModel.find({ _id: userId })
  //   return data
  // }

  // console.log(userInfo(userId))

  // const {
  // } = userInfo.then(data => data)
  // console.log(userInfo.then(data => console.log(data)))

  return `
    <h2>Alerte Citoyenne</h2>
    <p>
      ${firstname} ${lastname}<br/>
      ${address}<br/>
      ${postCode} ${city}<br/>
      ${email}<br/>
      ${phone}
    </p>

    <p>Nous envoie l'alerte suivante :</p>
    <p>${description}</p>
    <p>Du ${dateBegin.toLocaleString()} au ${dateEnd.toLocaleString()} à l'adresse ${addressAlert}.</p>

    <image src="${photo}" alt="Photo de l'alerte citoyenne" height="300"/>
  `
}

export function newAlert (req, res, next) {
  const userId = userIdfromToken(req)._id
  const alert = new Alert({
    userId: userId,
    ...req.body
  })
  alert.save()
    .then(() => {
      let emailService = ''
      switch (alert.typeAlert) {
        case 'voirie':
          emailService = 'voirie@villagealert.fr'
          break
        case 'stationnement':
          emailService = 'stationnement@villagealert.fr'
          break
        case 'travaux':
          emailService = 'travaux@villagealert.fr'
          break
        default:
          emailService = 'autres@villagealert.fr'
          break
      }
      // const from = `"${alert.firstname} ${alert.lastname}" <${alert.email}>`
      const from = 'city@village.fr'
      sendMail(from, emailService, 'Nouvelle alerte!', mailAlert(alert)).catch(console.error)
      res.status(201).json({ message: 'Votre alerte a bien été enregistrée!' })
    })
    .catch(error => res.status(400).json({ error: error }))
}

export function deleteAlert (req, res, next) {
  Alert.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message: 'Alerte supprimée !' }))
    .catch(error => res.status(400).json({ error }))
}
