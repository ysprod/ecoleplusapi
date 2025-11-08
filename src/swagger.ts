import { Express } from 'express';
import { resolve } from 'path';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Ecole+',
      version: '1.0.0',
      description: 'Documentation Swagger pour Ecole+ API',
    },
    servers: [{ url: 'http://localhost:3001' }],
  },
  apis: [resolve(__dirname, '**/*.ts')], // Scan des fichiers .ts
};

const specs = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};