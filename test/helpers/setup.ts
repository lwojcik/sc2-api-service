type EnvironmentVariable = {
  name: string;
  value: string | undefined;
};

const minimalSetup: EnvironmentVariable[] = [
  {
    name: 'NODE_ENV',
    value: 'test',
  },
  {
    name: 'SAS_APP_ENABLE_CORS',
    value: 'false',
  },
  {
    name: 'SAS_APP_CORS_ORIGIN',
    value: undefined,
  },
  {
    name: 'SAS_REDIS_ENABLE',
    value: 'false',
  },
  {
    name: 'SAS_REDIS_HOST',
    value: 'redis',
  },
  {
    name: 'SAS_REDIS_PORT',
    value: '6379',
  },
  {
    name: 'SAS_REDIS_TTL_SECS',
    value: '2000',
  },
  {
    name: 'SAS_REDIS_DB',
    value: '0',
  },
  {
    name: 'SAS_REDIS_KEY_PREFIX',
    value: 'sas',
  },
  {
    name: 'SAS_REDIS_KEY_NAME',
    value: '',
  },
];

export const setupEnvVariable = (
  variableName: string,
  variableValue: string
) => {
  process.env[variableName] = variableValue;
};

export const setupEnvVariables = (envVariables: EnvironmentVariable[]) => {
  envVariables.forEach((variable) => {
    setupEnvVariable(variable.name, variable.value);
  });
};

export const prepareMinimalSetup = () => setupEnvVariables(minimalSetup);
