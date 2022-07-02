import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { LadderController } from './ladder.controller';
import { LadderService } from './ladder.service';

@Module({
  imports: [LoggerModule],
  controllers: [LadderController],
  providers: [LadderService],
})
export class LadderModule {}
