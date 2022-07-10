import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(
      process.env.SAS_HTTPS_ENABLE === 'true'
        ? {
            https: {
              key: fs.readFileSync(process.env.SAS_HTTPS_KEY_PATH),
              cert: fs.readFileSync(process.env.SAS_HTTPS_CERT_PATH),
            },
          }
        : undefined
    )
  );

  if (process.env.SAS_APP_CORS_ENABLE) {
    const corsConfig =
      process.env.SAS_APP_CORS_ORIGIN.length > 0
        ? {
            origin: process.env.SAS_APP_CORS_ORIGIN,
            methods: ['GET'],
          }
        : undefined;
    app.enableCors(corsConfig);
  }

  if (process.env.NODE_ENV !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('sc2-api-service')
      .setDescription(
        'REST microservice for retrieving and caching data from StarCraft II Community and Game Data APIs'
      )
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  await app.listen(process.env.SAS_APP_PORT, process.env.SAS_APP_HOST);
}
bootstrap();
