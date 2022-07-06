import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { StarCraft2ApiService } from '../starcraft2api/starcraft2api.service';
import { CacheService } from '../cache/cache.service';
import { LoggerService } from '../logger/logger.service';
import { GetDataDto } from './dto/get-data.dto';
import { redisConfig } from '../config';
import { ApiData } from '../common/types';

@Injectable()
export class DataBrokerService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly starCraft2ApiService: StarCraft2ApiService,
    @Inject(redisConfig.KEY)
    private readonly redisConf: ConfigType<typeof redisConfig>,
    private readonly logger: LoggerService
  ) {}

  private getDataKey(key: string, args: unknown) {
    const argString = Object.values(args).join(':');
    const dataKey = `:${key}:${argString}`;

    this.logger.debug(`Generated data key: ${dataKey}`);
    return dataKey;
  }

  private getDataFromCache(key: string) {
    return this.cacheService.get(key);
  }

  private cacheData(key: string, value: string) {
    return this.cacheService.set(key, value);
  }

  private async getDataAndRefreshCache(key: string, args: unknown) {
    this.logger.debug('Getting data from Battle.net...');

    const dataFromApi = await this.starCraft2ApiService.get(key, args);
    const dataKey = this.getDataKey(key, args);

    this.logger.debug(`Using data key: ${dataKey}`);

    if (
      dataFromApi.statusCode === 200 &&
      !((dataFromApi as ApiData).data as unknown as { error: string }).error
    ) {
      this.logger.debug('Caching data...');
      this.cacheData(
        dataKey,
        JSON.stringify({
          created: Math.floor(Date.now() / 1000),
          ...dataFromApi,
        })
      );
    }
    return dataFromApi;
  }

  async getData({ key, args }: GetDataDto, refresh = false) {
    const dataKey = this.getDataKey(key, args);
    this.logger.debug(`Using data key: ${dataKey}`);

    const cachedObject = await this.getDataFromCache(dataKey);

    if (!cachedObject || refresh) {
      this.logger.debug(
        'No cached data or refresh was triggered - getting fresh data...'
      );
      return this.getDataAndRefreshCache(key, args);
    }

    const parsedData = JSON.parse(cachedObject);
    const now = Math.floor(Date.now() / 1000);
    const staleData =
      now - Number(parsedData?.created) >= this.redisConf.ttlSecs;

    if (staleData) {
      this.logger.debug('Cached data is stale - getting fresh data...');
      this.getDataAndRefreshCache(key, args);
    }

    return cachedObject;
  }
}
