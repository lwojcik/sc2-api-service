import { battleNetConfig } from './battlenet.config';

describe('battleNetConfig', () => {
  it('should create Battle.net config', () => {
    expect(battleNetConfig()).toMatchSnapshot();
  });
});
