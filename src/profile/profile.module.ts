import { Module } from '@nestjs/common';
import { DataBrokerModule } from '../databroker/databroker.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [DataBrokerModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
