import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker } from 'jest-mock';
import { DataController } from './data.controller';
import { DataService } from './data.service';

const moduleMocker = new ModuleMocker(global);

describe('DataController', () => {
  let controller: DataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataController],
    })
      .useMocker((token) => {
        if (token === DataService) {
          return {
            getLeague: () => ({
              status: 200,
              data: {
                foo: 'sample_getleague_data_from_mock',
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

    controller = module.get<DataController>(DataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get league data', async () => {
    expect(await controller.getLeague(1, 1, 1, 1)).toMatchSnapshot();
  });
});
