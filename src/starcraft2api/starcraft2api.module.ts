import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RequestContextModule } from 'nestjs-request-context';
import { BasModule } from '../bas/bas.module';
import { battleNetConfig } from '../config';
import { LoggerModule } from '../logger/logger.module';
import { StarCraft2ApiService } from './starcraft2api.service';

@Module({
  imports: [
    ConfigModule.forFeature(battleNetConfig),
    RequestContextModule,
    BasModule,
    LoggerModule,
  ],
  providers: [StarCraft2ApiService],
  exports: [StarCraft2ApiService],
})
export class Starcraft2ApiModule {}
