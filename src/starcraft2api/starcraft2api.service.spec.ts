import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker } from 'jest-mock';
import { StarCraft2ApiService } from './starcraft2api.service';

const moduleMocker = new ModuleMocker(global);

describe('StarCraft2ApiService', () => {
  let service: StarCraft2ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarCraft2ApiService],
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

    service = module.get<StarCraft2ApiService>(StarCraft2ApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
