import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UserService } from './user/user.service';
import * as bcrypt from 'bcryptjs';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  console.log('ENV JWT_SECRET present?', !!process.env.JWT_SECRET);
  app.useGlobalFilters(new HttpExceptionFilter());
  // Optional bootstrap seeding for an admin/demo account
  try {
    const seedEmail = process.env.SEED_ADMIN_EMAIL;
    const seedPassword = process.env.SEED_ADMIN_PASSWORD;
    if (seedEmail && seedPassword && seedPassword.length >= 8) {
      const userService = app.get(UserService);
      const existing = await userService.findRawByEmail(seedEmail);
      if (existing) {
        const currentHash = (existing as any).password;
        let needsUpdate = true;
        try {
          if (currentHash) {
            needsUpdate = !(await bcrypt.compare(seedPassword, currentHash));
          }
        } catch {
          needsUpdate = true;
        }
        if (needsUpdate) {
          const newHash = await bcrypt.hash(seedPassword, 10);
          (existing as any).password = newHash;
          await (existing as any).save();
          console.log(`🔑 Seed: password updated for ${seedEmail}`);
        } else {
          console.log(`🔑 Seed: password already up-to-date for ${seedEmail}`);
        }
      } else {
        await (app.get(UserService) as UserService).create({
          email: seedEmail.toLowerCase(),
          firstName: 'ADMIN',
          lastName: 'SEED',
          password: seedPassword,
          role: 'admin',
          profileType: 'founder',
        } as any);
        console.log(`👤 Seed: admin user created for ${seedEmail}`);
      }
    }
  } catch (e) {
    console.warn('Seed error (ignored):', e?.message || e);
  }

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
  
  console.log('🌐 CORS Configuration:', {
    envOrigins: envOrigins.length > 0 ? envOrigins : 'using defaults',
    allowedOrigins: allowedOrigins.slice(0, 3),
    totalOrigins: allowedOrigins.length
  });

  app.enableCors({
    origin: (origin, callback) => {
      console.log('🔍 CORS check for origin:', origin || 'no-origin (likely Postman/curl)');
      
      if (!origin) return callback(null, true); // Allow non-browser clients (Postman, curl)

      // Vérifier les origines exactes
      if (allowedOrigins.includes(origin)) {
        console.log('✅ CORS allowed (exact match):', origin);
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
      
      if (isAllowed) {
        console.log('✅ CORS allowed (pattern match):', origin);
        return callback(null, true);
      }
      
      console.warn('❌ CORS blocked:', origin);
      return callback(new Error('Not allowed by CORS'));
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
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger docs available at: http://localhost:${port}/api/docs`);
}
bootstrap();
