// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Task API',
    version: '1.0.0',
    description: 'API documentation for Task management system',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server',
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./api.js'], // Path to the API docs
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Middleware for serving Swagger UI
const swaggerDocs = swaggerUi.setup(swaggerSpec);

module.exports = {
  swaggerDocs,
  swaggerUi,
};
