import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Starcraft2ApiModule } from '../starcraft2api/starcraft2api.module';
import { CacheModule } from '../cache/cache.module';
import { LoggerModule } from '../logger/logger.module';
import { DataBrokerService } from './databroker.service';
import { redisConfig } from '../config';

@Module({
  imports: [
    ConfigModule.forFeature(redisConfig),
    CacheModule,
    Starcraft2ApiModule,
    LoggerModule,
  ],
  providers: [DataBrokerService],
  exports: [DataBrokerService],
})
export class DataBrokerModule {}
