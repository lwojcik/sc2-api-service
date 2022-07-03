import { Injectable } from '@nestjs/common';
import { RegionDto } from '../common/dto/region.dto';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LadderService {
  constructor(private readonly logger: LoggerService) {
    this.logger.setLoggedClass(LadderService.name);
  }

  getGrandmaster(regionDto: RegionDto, refresh?: boolean) {
    this.logger.setLoggedMethod(this.getGrandmaster.name);
    this.logger.debug();

    return { regionDto, refresh };
  }

  getSeason(regionDto: RegionDto, refresh?: boolean) {
    this.logger.setLoggedMethod(this.getSeason.name);
    this.logger.debug();

    return { regionDto, refresh };
  }
}
