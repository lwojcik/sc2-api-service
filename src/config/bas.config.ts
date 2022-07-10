import { registerAs } from '@nestjs/config';

export const basConfig = registerAs('bas', () => ({
  url: process.env.SAS_BAS_URL,
}));
