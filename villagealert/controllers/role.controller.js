import RoleModel from '../models/role.model.js'

export const addRole = async (req, res, next) => {
  const role = new RoleModel({
    ...req.body
  })
  role.save()
    .then(() => res.status(201).json({ message: 'Role enregistré !' }))
    .catch(error => res.status(400).json({ error }))
}

export const getRole = (req, res, next) => {
  RoleModel.findOne({ _id: req.params.id })
    .then((role) => res.status(200).json(role))
    .catch(error => res.status(404).json({ error }))
}

export const getRoles = async (req, res, next) => {
  const roles = await RoleModel.find()
  res.send(roles)
}

export const updateRole = (req, res, next) => {
  RoleModel.updateOne({ _id: req.params.id }, { ...req.body })
    .then(() => res.status(200).json({ message: 'Le role a été modifié !' }))
    .catch(error => res.status(404).json({ error }))
}

export const deleteRole = (req, res, next) => {
  RoleModel.findByIdAndDelete({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Le role a été supprimé !' }))
    .catch(error => res.status(400).json({ error }))
}
