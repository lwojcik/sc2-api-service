import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { DataController } from './data.controller';
import { DataService } from './data.service';

@Module({
  imports: [LoggerModule],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
