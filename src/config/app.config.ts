import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  name: 'sc2-api-service',
  environment: process.env.NODE_ENV,
  host: process.env.SAS_APP_HOST,
  port: parseInt(process.env.SAS_APP_PORT, 10),
  enableCors: process.env.SAS_APP_CORS_ENABLE === 'true',
  corsOrigin: process.env.SAS_APP_CORS_ORIGIN,
}));
