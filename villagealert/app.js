import dotenv from 'dotenv' // https://www.npmjs.com/package/dotenv
import express from 'express' // https://www.npmjs.com/package/express
import logger from 'morgan' // https://www.npmjs.com/package/morgan
import mongoose from 'mongoose' // https://www.npmjs.com/package/mongoose

// Swagger
import swaggerUi from 'swagger-ui-express'
import swaggerSpecs from './swaggerConfig.js'

// Authentification passport.js
import './utils/configPassport.js'

// Routes
import alertRoutes from './routes/alert.route.js'
import userRoutes from './routes/user.route.js'
import roleRoutes from './routes/role.route.js'

// Variables d'environnement
dotenv.config()

// Express + log pour le dev
const app = express()
app.use(logger('dev'))

// Connection à la base de données Mongo
mongoose.connect(`${process.env.DATABASE_URL}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

// Génération de la doc avec Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

// Tout en JSON
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))

// Use Routes
app.use('/api/alerts', alertRoutes)
app.use('/api/users', userRoutes)
app.use('/api/roles', roleRoutes)

// Listen
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Le serveur est lancé sur le port ${PORT}`))
