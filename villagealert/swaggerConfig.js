import swaggerJsDoc from 'swagger-jsdoc'
import dotenv from 'dotenv'

// Variables d'environnement
dotenv.config()

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'VillageAlert API',
      version: '1.0.0',
      description: 'A simple Express API'
      // termsOfService: 'http://example.com/terms/',
      // contact: {
      //   name: 'API Support',
      //   url: 'http://www.exmaple.com/support',
      //   email: 'support@example.com'
      // }
    },
    host: process.env.SWAGGER_SERVER_URL,
    servers: [
      {
        url: process.env.SWAGGER_SERVER_URL,
        description: 'VillageAlert API Documentation'
      }
    ]
  },
  apis: ['./routes/*.route.js']
}

export default swaggerJsDoc(options)
