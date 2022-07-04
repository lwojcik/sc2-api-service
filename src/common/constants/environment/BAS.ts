import { APP_INFO } from '../APP_INFO';
import { getEnvVar } from '../../../utils';
import { BasEnvVariable, FeaturePrefix } from '../../types';

const { appPrefix } = APP_INFO;
const featurePrefix = FeaturePrefix.bas;

const prop = (name: string) =>
  getEnvVar({ appPrefix, featurePrefix, property: name });

export const BAS = {
  url: prop(BasEnvVariable.url),
  clientId: prop(BasEnvVariable.clientId),
  clientSecret: prop(BasEnvVariable.clientSecret),
};
