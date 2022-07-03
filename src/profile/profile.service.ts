import { Injectable } from '@nestjs/common';
import { ProfileDto } from '../common/dto/profile.dto';
import { RegionDto } from '../common/dto/region.dto';
import { LoggerService } from '../logger/logger.service';
import { IndividualLadderDto } from './dto/individual-ladder.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly logger: LoggerService) {
    this.logger.setLoggedClass(ProfileService.name);
  }

  getStatic(regionDto: RegionDto, refresh?: boolean) {
    return { regionDto, refresh };
  }

  getMetadata(profileDto: ProfileDto, refresh?: boolean) {
    return { profileDto, refresh };
  }

  getProfile(profileDto: ProfileDto, refresh?: boolean) {
    return { profileDto, refresh };
  }

  getLadderSummary(profileDto: ProfileDto, refresh?: boolean) {
    return { profileDto, refresh };
  }

  getPlayerLadder(individualLadderDto: IndividualLadderDto, refresh?: boolean) {
    return { individualLadderDto, refresh };
  }
}
