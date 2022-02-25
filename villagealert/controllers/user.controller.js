import UserModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// Variables d'environnement
dotenv.config()

//
// Account
//
export function userFromToken (req) {
  const token = req.headers.authorization.split(' ')[1]
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
  return decodedToken.user
}

export const getAccount = async (req, res, next) => {
  console.log('testeureturisetui')
  const users = await UserModel.find({ _id: userFromToken(req)._id })
  users
    .then(res.send(users[0]))
    .catch(error => res.status(400).json({ error }))
}

export const updateAccount = (req, res, next) => {
  const userId = userFromToken(req)._id
  UserModel.updateOne({ _id: userId }, { ...req.body, _id: userId })
    .then(() => res.status(200).json({ message: 'Votre compte a été modifié !' }))
    .catch(error => res.status(404).json({ error }))
}

export const deleteAccount = (req, res, next) => {
  const userId = userFromToken(req)._id
  UserModel.findByIdAndDelete(userId)
    .then(() => res.status(200).json({ message: 'Votre compte a été supprimé !' }))
    .catch(error => res.status(400).json({ error }))
}

//
// Gestion de l'utilisateur par l'admin
//
export const updateUser = (req, res, next) => {
  UserModel.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Le compte a été modifié !' }))
    .catch(error => res.status(404).json({ error }))
}

export const deleteUser = (req, res, next) => {
  UserModel.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message: 'Le compte a été supprimé !' }))
    .catch(error => res.status(400).json({ error }))
}

export const getAllUsers = async (req, res) => {
  const users = await UserModel.find()
  res.send(users)
}

export const getOneUser = async (req, res) => {
  const users = await UserModel.find({ _id: req.params.id })
  res.send(users[0])
}
