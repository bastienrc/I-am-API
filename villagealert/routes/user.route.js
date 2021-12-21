import express from 'express'
import passport from 'passport'

import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import { catchErrors } from '../utils/helpers.js'
import { getAccount, signupController } from '../controllers/user.controller.js'

dotenv.config()

const router = express.Router()

// Account
router.get(
  '/account',
  passport.authenticate('signup', { session: false }),
  catchErrors(getAccount)
)

// signup
router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  catchErrors(signupController)
)

// Login
router.post(
  '/login',
  (req, res, next) => {
    passport.authenticate('login', async (err, user) => {
      try {
        if (err || !user) {
          const error = new Error('Une erreur est survenue.')
          return next(error)
        }

        req.login(user, { session: false }, async error => {
          if (error) return next(error)

          const body = { _id: user._id, email: user.email }
          const token = jwt.sign({ user: body }, process.env.SECRET_KEY)
          res.json({ token })
        })
      } catch (error) {
        return next(error)
      }
    })(req, res, next)
  }
)

export default router
