import UserModel from '../models/user.model.js'

export async function signupController (req, res, next) {
  res.json({
    message: 'Signup OK',
    user: req.user
  })
}

export const getAccount = async (req, res) => {
  const users = await UserModel.find({ _id: req.params.id })
  res.send(users[0])
}
