import { Test, TestingModule } from '@nestjs/testing';
import { BasService } from './bas.service';

describe('BasService', () => {
  let service: BasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasService],
    }).compile();

    service = module.get<BasService>(BasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
