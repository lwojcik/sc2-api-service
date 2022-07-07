import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker } from 'jest-mock';
import { StarCraft2ApiService } from '../starcraft2api/starcraft2api.service';
import { Sc2DataKey } from '../common/types';
import { DataBrokerService } from './databroker.service';
import { CacheService } from '../cache/cache.service';

const moduleMocker = new ModuleMocker(global);

describe('DataBrokerService', () => {
  let service: DataBrokerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataBrokerService],
    })
      .useMocker((token) => {
        if (token === CacheService) {
          return {
            get: () =>
              Promise.resolve(
                JSON.stringify({
                  statusCode: 200,
                  created: 1,
                  data: {
                    foo: 'sample_data_from_cache',
                  },
                })
              ),
            set: () => true,
          };
        }
        if (token === StarCraft2ApiService) {
          return {
            get: () =>
              Promise.resolve({
                statusCode: 200,
                created: 2000,
                data: {
                  foo: 'sample_data_from_sc2api_service_mock',
                },
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

    service = module.get<DataBrokerService>(DataBrokerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get data by key', async () => {
    expect(
      await service.getData({
        key: Sc2DataKey.getGrandmaster,
        args: { region: 'us' },
      })
    ).toMatchSnapshot();
  });

  it('should get data if refresh is forced', async () => {
    expect(
      await service.getData(
        {
          key: Sc2DataKey.getGrandmaster,
          args: { region: 'us' },
        },
        true
      )
    ).toMatchSnapshot();
  });
});
