import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const envOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  const defaultOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3001/api/docs',
    'http://localhost:3001/api',
    'https://ecoleplus.vercel.app',
    'https://ecoleplus-3464u432f-yaya-sidibes-projects.vercel.app', // Production actuelle
  ];
  const allowedOrigins = envOrigins.length ? envOrigins : defaultOrigins;

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Allow non-browser clients (Postman, curl)

      // Vérifier les origines exactes
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Vérifier les patterns regex
      const allowedPatterns = [
        /^http:\/\/localhost:\d+$/, // localhost avec n'importe quel port
        /^https:\/\/.*\.vercel\.app$/, // Tous les domaines Vercel
        /^https:\/\/.*-yaya-sidibes-projects\.vercel\.app$/, // Previews Vercel spécifiques
      ];

      const isAllowed = allowedPatterns.some((pattern) =>
        pattern.test(origin || ''),
      );
      return isAllowed
        ? callback(null, true)
        : callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
    exposedHeaders: 'Content-Disposition',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false, // Allow extra properties but strip them
      transformOptions: {
        enableImplicitConversion: true, // Auto-convert types
      },
      exceptionFactory: (errors) => {
        const messages = errors.map(error => ({
          field: error.property,
          errors: Object.values(error.constraints || {}),
        }));
        console.error('Validation errors:', JSON.stringify(messages, null, 2));
        return new ValidationPipe().createExceptionFactory()(errors);
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('École Plus API')
    .setDescription('API de gestion scolaire pour École Plus')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(process.env.API_URL || 'http://localhost:3001', 'Server')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  (document as any).security = [{ bearer: [] }];

  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'École Plus API Documentation',
    customfavIcon: 'https://nestjs.com/img/logo_text.svg',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      displayRequestDuration: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
}
bootstrap();
