import { Injectable } from '@nestjs/common';
import { DataBrokerService } from '../databroker/databroker.service';
import { DATA_KEYS } from '../common/constants';
import { RegionDto } from '../common/dto/region.dto';

@Injectable()
export class LadderService {
  constructor(private readonly dataBroker: DataBrokerService) {}

  getGrandmaster(regionDto: RegionDto, refresh?: boolean) {
    return this.dataBroker.getData({
      key: DATA_KEYS.ladder.getGrandmaster,
      args: regionDto.regionId,
      refresh,
    });
  }

  getSeason(regionDto: RegionDto, refresh?: boolean) {
    return this.dataBroker.getData({
      key: DATA_KEYS.ladder.getSeason,
      args: regionDto.regionId,
      refresh,
    });
  }
}
