import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisConfig } from '../config';
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
          host: configService.get('redis.host'),
          password: configService.get('redis.password'),
          port: configService.get('redis.port'),
          db: configService.get('redis.db'),
          expire: configService.get('redis.expire'),
          keyPrefix: configService.get('redis.keyPrefix'),
        },
      }),
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
