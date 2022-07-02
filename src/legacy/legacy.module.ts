import { Module } from '@nestjs/common';
import { LegacyService } from './legacy.service';
import { LegacyController } from './legacy.controller';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [LegacyService],
  controllers: [LegacyController],
})
export class LegacyModule {}
