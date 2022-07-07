import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker } from 'jest-mock';
import { DataBrokerService } from '../databroker/databroker.service';
import { DataService } from './data.service';

const moduleMocker = new ModuleMocker(global);

describe('DataService', () => {
  let service: DataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataService],
    })
      .useMocker((token) => {
        if (token === DataBrokerService) {
          return {
            getData: () =>
              Promise.resolve({
                status: 200,
                data: {
                  prop: 'sample_league_data_from_mock',
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

    service = module.get<DataService>(DataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get league data', async () => {
    expect(
      await service.getLeague({
        seasonId: 1,
        leagueId: 1,
        queueId: 1,
        teamType: 1,
      })
    ).toMatchSnapshot();
  });
});
