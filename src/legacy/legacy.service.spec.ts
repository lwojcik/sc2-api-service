import { Type } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockedClass, ModuleMocker } from 'jest-mock';
import { LegacyService } from './legacy.service';

const moduleMocker = new ModuleMocker(global);

describe('LegacyService', () => {
  let service: LegacyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LegacyService],
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

    service = module.get<LegacyService>(LegacyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
