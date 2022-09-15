import { Type } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockedClass, ModuleMocker } from 'jest-mock';
import { LadderService } from './ladder.service';

const moduleMocker = new ModuleMocker(global);

describe('LadderService', () => {
  let service: LadderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LadderService],
    })
      .useMocker((token) => {
        const mockMetadata = moduleMocker.getMetadata(token);
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new (Mock as MockedClass<Type<unknown>>)();
      })
      .compile();

    service = module.get<LadderService>(LadderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
