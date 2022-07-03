import { Injectable } from '@nestjs/common';
import { StarCraft2ApiService } from '../starcraft2api/starcraft2api.service';
import { CacheService } from '../cache/cache.service';
import { LoggerService } from '../logger/logger.service';
import { GetDataDto } from './dto/get-data.dto';

@Injectable()
export class DataBrokerService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly starcraft2apiService: StarCraft2ApiService,
    private readonly logger: LoggerService
  ) {
    this.logger.setLoggedClass(DataBrokerService.name);
  }

  private getDataKey(key: string, args: unknown) {
    this.logger.setLoggedMethod(this.getDataKey.name, { key, args });
    this.logger.debug();

    const argString = Object.values(args).join(':');
    const dataKey = `${key}:${argString}`;

    this.logger.debug(`Generated data key: ${dataKey}`);
    return dataKey;
  }

  private getDataFromCache(key: string) {
    this.logger.setLoggedMethod(this.getDataFromCache.name, key);
    this.logger.debug();
    return this.cacheService.get(key);
  }

  private getDataFromBattleNet(key: string, args: unknown) {
    this.logger.setLoggedMethod(this.getDataFromBattleNet.name, key);
    this.logger.debug();
    return this.starcraft2apiService.get(key, args);
  }

  private cacheData(key: string, value: unknown) {
    this.logger.setLoggedMethod(this.cacheData.name, { key, value });
    this.logger.debug();
    return this.cacheService.set(key, value);
  }

  getData({ key, args }: GetDataDto, refresh = false) {
    this.logger.setLoggedMethod(this.getData.name, { key, args });
    this.logger.debug();

    const dataKey = this.getDataKey(key, args);

    const cachedData = this.getDataFromCache(dataKey);

    if (!cachedData || refresh) {
      const dataFromApi = this.getDataFromBattleNet(key, args);
      this.cacheData(dataKey, dataFromApi);
      return dataFromApi;
    }

    return cachedData;
  }
}
