import { registerAs } from '@nestjs/config';

export const authConfig = registerAs('auth', () => ({
  enable: process.env.SAS_AUTH_ENABLE === 'true',
  username: process.env.SAS_AUTH_USERNAME,
  jwtSecret: process.env.SAS_AUTH_JWT_SECRET,
}));
