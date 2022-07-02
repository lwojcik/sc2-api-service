import { Test, TestingModule } from '@nestjs/testing';
import { LadderService } from './ladder.service';

describe('LadderService', () => {
  let service: LadderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LadderService],
    }).compile();

    service = module.get<LadderService>(LadderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
