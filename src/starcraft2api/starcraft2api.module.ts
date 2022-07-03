import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RequestContextModule } from 'nestjs-request-context';
import { battleNetConfig } from '../config';
import { LoggerModule } from '../logger/logger.module';
import { StarCraft2ApiService } from './starcraft2api.service';

@Module({
  imports: [
    ConfigModule.forFeature(battleNetConfig),
    RequestContextModule,
    LoggerModule,
  ],
  providers: [StarCraft2ApiService],
  exports: [StarCraft2ApiService],
})
export class Starcraft2ApiModule {}
