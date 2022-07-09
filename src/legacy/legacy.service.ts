import { Injectable } from '@nestjs/common';
import { ProfileDto } from '../common/dto/profile.dto';
import { LadderDto } from '../common/dto/ladder.dto';
import { RegionDto } from '../common/dto/region.dto';
import { DATA_KEYS } from '../common/constants';
import { DataBrokerService } from '../databroker/databroker.service';

@Injectable()
export class LegacyService {
  constructor(private readonly dataBroker: DataBrokerService) {}

  getProfile(profileDto: ProfileDto, refresh?: boolean) {
    return this.dataBroker.getData({
      key: DATA_KEYS.legacy.getProfile,
      args: profileDto,
      refresh,
    });
  }

  getLadders(profileDto: ProfileDto, refresh?: boolean) {
    return this.dataBroker.getData({
      key: DATA_KEYS.legacy.getLadders,
      args: profileDto,
      refresh,
    });
  }

  getMatches(profileDto: ProfileDto, refresh?: boolean) {
    return this.dataBroker.getData({
      key: DATA_KEYS.legacy.getMatches,
      args: profileDto,
      refresh,
    });
  }

  getLadder(ladderDto: LadderDto, refresh?: boolean) {
    return this.dataBroker.getData({
      key: DATA_KEYS.legacy.getLadder,
      args: ladderDto.ladderId,
      refresh,
    });
  }

  getAchievements(regionDto: RegionDto, refresh?: boolean) {
    return this.dataBroker.getData({
      key: DATA_KEYS.legacy.getAchievements,
      args: regionDto.regionId,
      refresh,
    });
  }

  getRewards(ladderDto: LadderDto, refresh?: boolean) {
    return this.dataBroker.getData({
      key: DATA_KEYS.legacy.getRewards,
      args: ladderDto.ladderId,
      refresh,
    });
  }
}
