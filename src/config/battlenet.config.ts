import { registerAs } from '@nestjs/config';
import { RegionName } from 'blizzapi';
import { BATTLENET, DEFAULTS } from '../common/constants';

const { env } = process;
const defaultValue = DEFAULTS.battlenet;

export const battleNetConfig = registerAs('battlenet', () => ({
  region: env[BATTLENET.region] as RegionName,
  clientId: env[BATTLENET.clientId],
  clientSecret: env[BATTLENET.clientSecret],
  timeoutMs: parseInt(env[BATTLENET.timeoutMs], 10) || defaultValue.timeoutMs,
}));
