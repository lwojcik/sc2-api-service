import { Type } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockedClass, ModuleMocker } from 'jest-mock';
import { ProfileService } from './profile.service';

const moduleMocker = new ModuleMocker(global);

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileService],
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

    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
