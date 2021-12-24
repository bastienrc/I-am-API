import swaggerJsDoc from 'swagger-jsdoc'

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
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'VillageAlert API Documentation'
      }
    ]
  },
  apis: ['./routes/*.route.js']
}

export default swaggerJsDoc(options)
