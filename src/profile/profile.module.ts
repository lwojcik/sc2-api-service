import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [LoggerModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
