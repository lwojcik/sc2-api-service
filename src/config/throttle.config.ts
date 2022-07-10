import { registerAs } from '@nestjs/config';

export const throttleConfig = registerAs('throttle', () => ({
  ttlSecs: parseInt(process.env.SAS_THROTTLE_TTL_SECS, 10),
  limit: parseInt(process.env.SAS_THROTTLE_LIMIT, 10),
}));
