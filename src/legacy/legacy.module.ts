import { Module } from '@nestjs/common';
import { LegacyService } from './legacy.service';
import { LegacyController } from './legacy.controller';
import { DataBrokerModule } from '../databroker/databroker.module';

@Module({
  imports: [DataBrokerModule],
  providers: [LegacyService],
  controllers: [LegacyController],
})
export class LegacyModule {}
