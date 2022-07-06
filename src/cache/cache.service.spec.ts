import { RedisService } from '@liaoliaots/nestjs-redis';
import { ConfigModule, registerAs } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker } from 'jest-mock';
import { CacheService } from './cache.service';

const moduleMocker = new ModuleMocker(global);

describe('CacheService', () => {
  let serviceWithExpireSet: CacheService;
  let serviceWithExpireUnset: CacheService;
  // let serviceWithRedisDisabled: CacheService;

  beforeEach(async () => {
    const moduleFactory: (expire?: boolean) => Promise<TestingModule> = (
      expire
    ) =>
      Test.createTestingModule({
        imports: [
          ConfigModule.forFeature(
            registerAs('redis', () => ({
              expire,
            }))
          ),
        ],
        providers: [CacheService],
      })
        .useMocker((token) => {
          if (token === RedisService) {
            return {
              getClient: () => ({
                get: () => 'sample_key_value_from_mocked_redis_client',
                set: () => jest.fn(),
                expire: () => jest.fn(),
              }),
            };
          }
          if (typeof token === 'function') {
            const mockMetadata = moduleMocker.getMetadata(token);
            const Mock = moduleMocker.generateFromMetadata(mockMetadata);
            return new Mock();
          }
          return jest.fn();
        })
        .compile();

    serviceWithExpireSet = (await moduleFactory(true)).get<CacheService>(
      CacheService
    );

    serviceWithExpireUnset = (await moduleFactory()).get<CacheService>(
      CacheService
    );
  });

  it('should be defined', () => {
    expect(serviceWithExpireUnset).toBeDefined();
  });

  it('should get cached value by key', async () => {
    expect(await serviceWithExpireUnset.get('key')).toMatchSnapshot();
  });

  it('should set key', async () => {
    expect(() => serviceWithExpireUnset.set('key', 'foo')).not.toThrow();
  });

  it('should set expiration if enabled in config', () => {
    expect(() => serviceWithExpireSet.set('key', 'foo')).not.toThrow();
  });
});
