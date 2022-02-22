import passport from 'passport'
import { Strategy } from 'passport-local'
import UserModel from '../models/user.model.js'
import dotenv from 'dotenv'
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt'
dotenv.config()

// Passport Signup
passport.use(
  'signup',
  new Strategy(
    {
      usernameField: 'email',
      passportField: 'password',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        const isEmailExist = await UserModel.findOne({ email })

        if (isEmailExist) {
          return done({ status: 400, message: 'Email déja utilisé.' })
        } else {
          const user = await UserModel.create({ ...req.body })
          return done(null, user)
        }
      } catch (error) {
        return done(error)
      }
    }
  )
)

// Passport Login
passport.use(
  'login',
  new Strategy(
    {
      usernameField: 'email',
      passportField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email })

        if (!user) {
          return done(null, false, { message: 'Utilisateur non trouvé.' })
        }

        const validate = await user.isValidPassword(password)

        if (!validate) {
          return done(null, false, { message: 'Erreur de connexion' })
        }

        return done(null, user, { message: 'Connexion réussie.' })
      } catch (error) {
        return done(error)
      }
    }
  )
)

// Passport JWT
passport.use(
  new JWTstrategy({
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('token')
  },
  async (token, done) => {
    try {
      return done(null, token.user)
    } catch (error) {
      done(error)
    }
  })
)

export default passport
