import dotenv from 'dotenv' // https://www.npmjs.com/package/dotenv
import createError from 'http-errors' // https://www.npmjs.com/package/http-errors
import express from 'express' // https://www.npmjs.com/package/express
import logger from 'morgan' // https://www.npmjs.com/package/morgan
import mongoose from 'mongoose' // https://www.npmjs.com/package/mongoose

// Routes
import alertRoutes from './routes/alert.route.js'

// Variables d'environnement
dotenv.config()

// Express + log pour le dev
const app = express()
app.use(logger('dev'))

// Connection à la base de données Mongo
mongoose.connect(`${process.env.DATABASE_URL}?retryWrites=true&w=majority`,
  {
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
app.use(express.json())

// Use Routes
app.use('/api/alerts', alertRoutes)

app.listen(process.env.PORT || 3000)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
