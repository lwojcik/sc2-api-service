import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisConfig } from '../config';
import { REDIS } from '../common/constants';
import { CacheService } from './cache.service';

@Module({
  imports: [
    ConfigModule.forFeature(redisConfig),
    RedisModule.forRootAsync({
      imports: [ConfigModule.forFeature(redisConfig)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        readyLog: true,
        config: {
          host: configService.get(REDIS.host),
          password: configService.get(REDIS.password),
          port: configService.get(REDIS.port),
          db: configService.get(REDIS.db),
          keyPrefix: configService.get(REDIS.keyPrefix),
        },
      }),
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}