import { Test, TestingModule } from '@nestjs/testing';
import { LegacyService } from './legacy.service';

describe('LegacyService', () => {
  let service: LegacyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LegacyService],
    }).compile();

    service = module.get<LegacyService>(LegacyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
