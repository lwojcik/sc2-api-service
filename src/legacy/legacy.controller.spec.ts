import { Type } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockedClass, ModuleMocker } from 'jest-mock';
import { LegacyController } from './legacy.controller';

const moduleMocker = new ModuleMocker(global);

describe('LegacyController', () => {
  let controller: LegacyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LegacyController],
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

    controller = module.get<LegacyController>(LegacyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
