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

  getProfile(profileDto: ProfileDto, refresh?: boolean) {
    return { profileDto, refresh };
  }

  getLadders(profileDto: ProfileDto, refresh?: boolean) {
    return { profileDto, refresh };
  }

  getMatches(profileDto: ProfileDto, refresh?: boolean) {
    return { profileDto, refresh };
  }

  getLadder(ladderDto: LadderDto, refresh?: boolean) {
    return { ladderDto, refresh };
  }

  getAchievements(regionDto: RegionDto, refresh?: boolean) {
    return { regionDto, refresh };
  }

  getRewards(ladderDto: LadderDto, refresh?: boolean) {
    return { ladderDto, refresh };
  }
}
