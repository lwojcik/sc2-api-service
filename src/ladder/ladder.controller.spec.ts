import { Test, TestingModule } from '@nestjs/testing';
import { LadderController } from './ladder.controller';

describe('LadderController', () => {
  let controller: LadderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LadderController],
    }).compile();

    controller = module.get<LadderController>(LadderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
