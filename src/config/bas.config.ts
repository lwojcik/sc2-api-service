import { registerAs } from '@nestjs/config';
import { BAS } from '../common/constants';

const { env } = process;

export const basConfig = registerAs('bas', () => ({
  url: env[BAS.url],
}));
