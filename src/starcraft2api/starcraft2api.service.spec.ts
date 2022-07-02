import { Test, TestingModule } from '@nestjs/testing';
import { StarCraft2ApiService } from './starcraft2api.service';

describe('StarCraft2ApiService', () => {
  let service: StarCraft2ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarCraft2ApiService],
    }).compile();

    service = module.get<StarCraft2ApiService>(StarCraft2ApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
