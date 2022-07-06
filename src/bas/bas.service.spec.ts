import { ModuleMocker } from 'jest-mock';
import { Test, TestingModule } from '@nestjs/testing';
import { BasService } from './bas.service';

const moduleMocker = new ModuleMocker(global);

describe('BasService', () => {
  let service: BasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasService],
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

    service = module.get<BasService>(BasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
