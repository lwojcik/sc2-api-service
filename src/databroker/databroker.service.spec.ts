import { Test, TestingModule } from '@nestjs/testing';
import { DataBrokerService } from './databroker.service';

describe('DataBrokerService', () => {
  let service: DataBrokerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataBrokerService],
    }).compile();

    service = module.get<DataBrokerService>(DataBrokerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
