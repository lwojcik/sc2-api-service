import { Module } from '@nestjs/common';
import { DataBrokerModule } from '../databroker/databroker.module';
import { LadderController } from './ladder.controller';
import { LadderService } from './ladder.service';

@Module({
  imports: [DataBrokerModule],
  controllers: [LadderController],
  providers: [LadderService],
})
export class LadderModule {}
