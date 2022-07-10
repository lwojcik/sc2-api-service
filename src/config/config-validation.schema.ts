import * as Joi from 'joi';
import { validateRegionName } from '../common/validators/validateRegionName.validator';

const appSchema = {
  NODE_ENV: Joi.string().default('production'),
  SAS_APP_HOST: Joi.string().default('0.0.0.0'),
  SAS_APP_PORT: Joi.string().default(3000),
  SAS_APP_CORS_ENABLE: Joi.string().default('false'),
  SAS_APP_CORS_ORIGIN: Joi.optional(),
};

const redisSchema = {
  SAS_REDIS_ENABLE: Joi.string().default('false'),
  SAS_REDIS_HOST: Joi.string().optional().default('redis'),
  SAS_REDIS_PORT: Joi.string().optional().default('6379'),
  SAS_REDIS_PASSWORD: Joi.any().optional(),
  SAS_REDIS_TTL_SECS: Joi.string().optional().default('2000'),
  SAS_REDIS_DB: Joi.string().optional().default('0'),
};

const battlenetSchema = {
  SAS_BATTLENET_REGION: Joi.string().required().custom(validateRegionName),
  SAS_BATTLENET_CLIENT_ID: Joi.string().required(),
  SAS_BATTLENET_CLIENT_SECRET: Joi.string().required(),
  SAS_BATTLENET_TIMEOUT_MS: Joi.string().default('30000'),
};

const throttleSchema = {
  SAS_THROTTLE_LIMIT: Joi.string().default('300'),
  SAS_THROTTLE_TTL_SECS: Joi.string().default('60'),
};

const authSchema = {
  SAS_AUTH_ENABLE: Joi.string().default('false'),
  SAS_AUTH_USERNAME: Joi.string().optional(),
  SAS_AUTH_JWT_SECRET: Joi.string().optional(),
};

const httpsSchema = {
  SAS_HTTPS_ENABLE: Joi.string().default('false'),
  SAS_HTTPS_KEY_PATH: Joi.string().optional(),
  SAS_HTTPS_CERT_PATH: Joi.string().optional(),
};

const basSchema = {
  SAS_BAS_URL: Joi.string().required(),
};

export const configValidationSchema = Joi.object({
  ...appSchema,
  ...redisSchema,
  ...battlenetSchema,
  ...throttleSchema,
  ...authSchema,
  ...httpsSchema,
  ...basSchema,
});
