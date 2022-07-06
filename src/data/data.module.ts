import { Module } from '@nestjs/common';
import { DataBrokerModule } from '../databroker/databroker.module';
import { DataController } from './data.controller';
import { DataService } from './data.service';

@Module({
  imports: [DataBrokerModule],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
