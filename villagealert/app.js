import dotenv from 'dotenv' // https://www.npmjs.com/package/dotenv
import express from 'express' // https://www.npmjs.com/package/express
import logger from 'morgan' // https://www.npmjs.com/package/morgan
import mongoose from 'mongoose' // https://www.npmjs.com/package/mongoose
import './utils/auth.js'

// Routes
import alertRoutes from './routes/alert.route.js'
import userRoutes from './routes/user.route.js'

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

// Tout en JSON
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))

// Use Routes
app.use('/api/alerts', alertRoutes)
app.use('/api/users', userRoutes)

// Listen
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Le serveur est lancé sur le port ${PORT}`))
