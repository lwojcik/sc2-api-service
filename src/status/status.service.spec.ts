import { Test, TestingModule } from '@nestjs/testing';
import { StatusService } from './status.service';

describe('StatusService', () => {
  let service: StatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusService],
    }).compile();

    service = module.get<StatusService>(StatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return status response', () => {
    jest.spyOn(process, 'uptime').mockImplementation(() => 128);
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

    expect(service.getStatus()).toMatchSnapshot();
  });
});
