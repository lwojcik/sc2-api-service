import { RedisService } from '@liaoliaots/nestjs-redis';
import { ConfigModule, registerAs } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '../logger/logger.service';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  let serviceWithRedisEnabled: CacheService;
  // let serviceWithRedisDisabled: CacheService;

  beforeEach(async () => {
    const moduleFactory: (redisEnabled: boolean) => Promise<TestingModule> = (
      redisEnabled: boolean
    ) =>
      Test.createTestingModule({
        imports: [
          ConfigModule.forFeature(
            registerAs('redis', () => ({
              enable: redisEnabled,
              host: 'test-redis-host',
              port: '1234',
              password: 'test-password',
              ttlSecs: 10,
              db: 0,
              keyName: 'testkeyname',
              keyPrefix: 'testkeyprefix',
            }))
          ),
        ],
        providers: [
          {
            provide: RedisService,
            useValue: {
              getClient: () => ({
                get: jest.fn().mockImplementation(() => ({
                  statusCode: 200,
                  data: 'sample_mocked_data',
                })),
                set: jest.fn(),
              }),
            },
          },
          {
            provide: LoggerService,
            useValue: {
              debug: jest.fn(),
              log: jest.fn(),
              setLoggedClass: jest.fn(),
              setLoggedMethod: jest.fn(),
            },
          },
          CacheService,
        ],
      }).compile();

    serviceWithRedisEnabled = (await moduleFactory(true)).get<CacheService>(
      CacheService
    );

    // serviceWithRedisDisabled = (await moduleFactory(false)).get<CacheService>(
    //   CacheService
    // );
  });

  it('should be defined', () => {
    expect(serviceWithRedisEnabled).toBeDefined();
  });
});
