import { Injectable } from '@nestjs/common';
import { ProfileDto } from '../common/dto/profile.dto';
import { LoggerService } from '../logger/logger.service';
import { LadderDto } from '../common/dto/ladder.dto';
import { RegionDto } from '../common/dto/region.dto';

@Injectable()
export class LegacyService {
  constructor(private readonly logger: LoggerService) {
    this.logger.setLoggedClass(LegacyService.name);
  }

  getProfile(profileDto: ProfileDto) {
    return profileDto;
  }

  getLadders(profileDto: ProfileDto) {
    return profileDto;
  }

  getMatches(profileDto: ProfileDto) {
    return profileDto;
  }

  getLadder(ladderDto: LadderDto) {
    return ladderDto;
  }

  getAchievements(regionDto: RegionDto) {
    return regionDto;
  }

  getRewards(ladderDto: LadderDto) {
    return ladderDto;
  }
}
