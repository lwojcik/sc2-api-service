import { Module } from '@nestjs/common';
import { DataBrokerModule } from '../databroker/databroker.module';
import { LoggerModule } from '../logger/logger.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [DataBrokerModule, LoggerModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
