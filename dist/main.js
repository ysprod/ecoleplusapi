"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const envOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map(o => o.trim()).filter(Boolean);
    const defaultOrigins = [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3001/api/docs',
        'http://localhost:3001/api',
        'https://ecoleplus.vercel.app',
    ];
    const allowedOrigins = envOrigins.length ? envOrigins : defaultOrigins;
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin)
                return callback(null, true);
            const isAllowed = allowedOrigins.includes(origin) ||
                /localhost:\d+$/.test(origin || '') ||
                /https:\/\/.*\.vercel\.app$/.test(origin || '');
            return isAllowed ? callback(null, true) : callback(new Error('Not allowed by CORS'));
        },
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        exposedHeaders: 'Content-Disposition',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('École Plus API')
        .setDescription('API de gestion scolaire pour École Plus')
        .setVersion('1.0')
        .addBearerAuth()
        .addServer(process.env.API_URL || 'http://localhost:3001', 'Server')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    document.security = [{ bearer: [] }];
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
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
//# sourceMappingURL=main.js.map