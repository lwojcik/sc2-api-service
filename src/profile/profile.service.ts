import { Injectable } from '@nestjs/common';
import { DATA_KEYS } from '../common/constants';
import { DataBrokerService } from '../databroker/databroker.service';
import { ProfileDto } from '../common/dto/profile.dto';
import { RegionDto } from '../common/dto/region.dto';
import { IndividualLadderDto } from './dto/individual-ladder.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly dataBroker: DataBrokerService) {}

  getStatic(regionDto: RegionDto, refresh?: boolean) {
    return this.dataBroker.getData({
      key: DATA_KEYS.profile.getStatic,
      args: regionDto,
      refresh,
    });
  }

  getMetadata(profileDto: ProfileDto, refresh?: boolean) {
    return this.dataBroker.getData({
      key: DATA_KEYS.profile.getMetadata,
      args: profileDto,
      refresh,
    });
  }

  getProfile(profileDto: ProfileDto, refresh?: boolean) {
    return this.dataBroker.getData({
      key: DATA_KEYS.profile.getProfile,
      args: profileDto,
      refresh,
    });
  }

  getLadderSummary(profileDto: ProfileDto, refresh?: boolean) {
    return this.dataBroker.getData({
      key: DATA_KEYS.profile.getLadderSummary,
      args: profileDto,
      refresh,
    });
  }

  getPlayerLadder(individualLadderDto: IndividualLadderDto, refresh?: boolean) {
    return this.dataBroker.getData({
      key: DATA_KEYS.profile.getPlayerLadder,
      args: individualLadderDto,
      refresh,
    });
  }
}
