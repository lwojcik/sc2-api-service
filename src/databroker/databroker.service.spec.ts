import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker } from 'jest-mock';
import { DataBrokerService } from './databroker.service';

const moduleMocker = new ModuleMocker(global);

describe('DataBrokerService', () => {
  let service: DataBrokerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataBrokerService],
    })
      .useMocker((token) => {
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
});
