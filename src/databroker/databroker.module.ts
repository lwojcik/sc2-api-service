import { Module } from '@nestjs/common';
import { DataBrokerService } from './databroker.service';

@Module({
  providers: [DataBrokerService],
})
export class DataBrokerModule {}
