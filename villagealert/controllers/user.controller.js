import UserModel from '../models/user.model.js'

export async function signup (req, res, next) {
  res.json({
    message: 'Signup OK',
    user: req.user
  })
}

export const getAccount = async (req, res) => {
  const users = await UserModel.find({ _id: req.params.id })
  res.send(users[0])
}

export const updateUser = (req, res, next) => {
  UserModel.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))
    .catch(error => res.status(404).json({ error }))
}

export const deleteUser = (req, res, next) => {
  UserModel.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
    .catch(error => res.status(400).json({ error }))
}
