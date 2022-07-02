import { Test, TestingModule } from '@nestjs/testing';
import { LegacyController } from './legacy.controller';

describe('LegacyController', () => {
  let controller: LegacyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LegacyController],
    }).compile();

    controller = module.get<LegacyController>(LegacyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
