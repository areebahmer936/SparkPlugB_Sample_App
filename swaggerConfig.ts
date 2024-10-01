import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Sparkplug B Based Industrial IOT',
      version: '1.0.0',
    },
    components: {
      // securitySchemes: {
      //   bearerAuth: {
      //     type: 'http',
      //     scheme: 'bearer',
      //     bearerFormat: 'JWT',
      //   },
      // },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // apis: [    
  //   `${__dirname}/src/routes/*.ts`,
  //   `${__dirname}/dist/src/routes/*.js`,
  //   path.join(__dirname, './routes/*.js'),
  //   "./dist/src/**/*.js"
  // ],

  apis: [
    `${__dirname}/src/routes/*.ts`, // API routes in TypeScript
    `${__dirname}/dist/src/routes/*.js`, // Compiled API routes in JavaScript
    path.join(__dirname, './routes/*.js'), // Additional routes if necessary
    './dist/src/**/*.js', // All compiled routes
  ],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);