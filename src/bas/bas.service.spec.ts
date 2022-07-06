import { ModuleMocker } from 'jest-mock';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { BasService } from './bas.service';

const moduleMocker = new ModuleMocker(global);

describe('BasService', () => {
  let service: BasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasService],
    })
      .useMocker((token) => {
        if (token === HttpService) {
          return {
            axiosRef: {
              get: () =>
                Promise.resolve({
                  data: {
                    accessToken: 'sample_access_token_from_httpservice_mock',
                    source: 'battlenet',
                  },
                }),
            },
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token);
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
        return jest.fn();
      })
      .compile();

    service = module.get<BasService>(BasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get access token', async () => {
    expect(await service.getAccessToken()).toMatchSnapshot();
  });

  it('should get refreshed access token', async () => {
    expect(await service.getAccessToken(true)).toMatchSnapshot();
  });
});
