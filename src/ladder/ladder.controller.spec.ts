import { Type } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockedClass, ModuleMocker } from 'jest-mock';
import { LadderController } from './ladder.controller';

const moduleMocker = new ModuleMocker(global);

describe('LadderController', () => {
  let controller: LadderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LadderController],
    })
      .useMocker((token) => {
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token);
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new (Mock as MockedClass<Type<unknown>>)();
        }
        return jest.fn();
      })
      .compile();

    controller = module.get<LadderController>(LadderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
