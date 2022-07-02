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

  getStatic(regionDto: RegionDto) {
    return regionDto;
  }

  getMetadata(profileDto: ProfileDto) {
    return profileDto;
  }

  getProfile(profileDto: ProfileDto) {
    return profileDto;
  }

  getLadderSummary(profileDto: ProfileDto) {
    return profileDto;
  }

  getPlayerLadder(individualLadderDto: IndividualLadderDto) {
    return individualLadderDto;
  }
}
