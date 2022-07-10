import { registerAs } from '@nestjs/config';
import { RegionName } from 'blizzapi';

export const battleNetConfig = registerAs('battlenet', () => ({
  region: process.env.SAS_BATTLENET_REGION as RegionName,
  clientId: process.env.SAS_BATTLENET_CLIENT_ID,
  clientSecret: process.env.SAS_BATTLENET_CLIENT_SECRET,
  timeoutMs: parseInt(process.env.SAS_BATTLENET_CLIENT_SECRET, 10),
}));
