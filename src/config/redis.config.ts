import { registerAs } from '@nestjs/config';

export const redisConfig = registerAs('redis', () => ({
  enable: process.env.SAS_REDIS_ENABLE === 'true',
  host: process.env.SAS_REDIS_HOST,
  port: parseInt(process.env.SAS_REDIS_PORT, 10),
  password: process.env.SAS_REDIS_PASSWORD,
  ttlSecs: parseInt(process.env.SAS_REDIS_TTL_SECS, 10),
  db: parseInt(process.env.SAS_REDIS_DB, 10),
  keyPrefix: 'sas',
  expire: process.env.SAS_REDIS_EXPIRE === 'true',
}));
