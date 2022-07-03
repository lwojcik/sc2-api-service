import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { StarCraft2ApiService } from './starcraft2api.service';

@Module({
  imports: [LoggerModule],
  providers: [StarCraft2ApiService],
  exports: [StarCraft2ApiService],
})
export class Starcraft2ApiModule {}
