import { RedisService } from '@liaoliaots/nestjs-redis';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import Redis from 'ioredis';
import { redisConfig } from '../config';

@Injectable()
export class CacheService {
  private readonly cache: Redis;

  constructor(
    private readonly redisService: RedisService,
    @Inject(redisConfig.KEY)
    private readonly redisConf: ConfigType<typeof redisConfig>
  ) {
    this.cache = this.redisService.getClient();
  }

  async get(key: string) {
    return this.cache.get(key);
  }

  set(key: string, value: string) {
    this.cache.set(key, value as string);
    if (this.redisConf.expire) {
      this.cache.expire(key, this.redisConf.ttlSecs);
    }
  }
}
