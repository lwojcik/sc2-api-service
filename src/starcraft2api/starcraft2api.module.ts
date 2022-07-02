import { Module } from '@nestjs/common';
import { StarCraft2ApiService } from './starcraft2api.service';

@Module({
  providers: [StarCraft2ApiService],
})
export class Starcraft2ApiModule {}
